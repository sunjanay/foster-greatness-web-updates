"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

interface CircleEvent {
  id: string;
  name: string;
  starts_at: string;
  url: string;
  location_type: string;
  host?: string;
  member_name?: string;
  cover_image_url?: string;
  space?: {
    slug: string;
  };
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<CircleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();

        // Handle Circle.so response format
        const allEvents = data.records || data || [];

        // Get current date for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter to general-events space and future events, limit to 3
        const filteredEvents = allEvents
          .filter((event: CircleEvent) => {
            const isGeneralEvents = event.space?.slug === 'general-events';
            const eventDate = new Date(event.starts_at);
            eventDate.setHours(0, 0, 0, 0);
            return isGeneralEvents && eventDate >= today;
          })
          .sort((a: CircleEvent, b: CircleEvent) =>
            new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
          )
          .slice(0, 3);

        setEvents(filteredEvents);
      } catch (err) {
        setError('Unable to load events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-20 bg-gray-100 rounded"></div>
          <div className="h-20 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || events.length === 0) {
    return null; // Don't show section if no events
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-8 shadow-md border border-gray-100"
    >
      <h3 className="text-2xl font-bold mb-6 text-fg-navy flex items-center gap-2">
        <Calendar className="w-6 h-6 text-fg-teal" aria-hidden="true" />
        Upcoming Community Events
      </h3>

      <div className="space-y-4">
        {events.map((event, index) => {
          const eventDate = new Date(event.starts_at);
          const dayOfMonth = eventDate.getDate();
          const monthName = eventDate.toLocaleDateString('en-US', { month: 'short' });
          const dayOfWeek = eventDate.toLocaleDateString('en-US', { weekday: 'short' });
          const timeString = eventDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });

          return (
            <motion.a
              key={event.id}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-fg-light-blue transition-colors group"
            >
              {/* Calendar date block */}
              <div className="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center min-w-[60px]">
                <div className="text-xs font-medium text-fg-teal uppercase">{monthName}</div>
                <div className="text-2xl font-bold text-fg-navy">{dayOfMonth}</div>
                <div className="text-xs text-gray-500">{dayOfWeek}</div>
              </div>

              {/* Event details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-fg-navy group-hover:text-fg-teal transition-colors line-clamp-2">
                  {event.name}
                </h4>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {timeString}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {event.location_type === 'virtual' ? 'Virtual' : 'In-Person'}
                  </span>
                </div>
              </div>

              {/* External link indicator */}
              <ExternalLink
                className="w-4 h-4 text-gray-400 group-hover:text-fg-teal transition-colors flex-shrink-0 mt-1"
                aria-hidden="true"
              />
            </motion.a>
          );
        })}
      </div>

      <a
        href="https://community.fostergreatness.co/c/general-events"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-fg-teal font-medium hover:underline"
      >
        View All Community Events
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </a>
    </motion.div>
  );
}
