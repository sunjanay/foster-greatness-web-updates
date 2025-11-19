'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, FileText, Newspaper, ArrowRight, Clock, Heart, Link2, Check, MapPin, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import updatesData from '@/data/updates.json'

interface CircleEvent {
  id: string
  name: string
  starts_at: string
  url: string
  location_type: string
  host?: string
  member_name?: string
  cover_image_url?: string
  space?: {
    slug: string
  }
}

type UpdateType = 'news' | 'page' | 'event' | 'donate'

interface Update {
  id: string
  type: UpdateType
  title: string
  description: string
  date: string
  link: string
  linkText: string
  eventDate?: string
  eventTime?: string
  image?: string
}

const typeConfig = {
  news: {
    icon: Newspaper,
    label: 'News',
    gradient: 'from-fg-teal to-fg-accent-teal',
  },
  page: {
    icon: FileText,
    label: 'New Page',
    gradient: 'from-fg-navy to-fg-teal',
  },
  event: {
    icon: Calendar,
    label: 'Event',
    gradient: 'from-fg-orange to-fg-yellow',
  },
  donate: {
    icon: Heart,
    label: 'Donate',
    gradient: 'from-fg-teal to-fg-accent-teal',
  },
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg bg-white/80 hover:bg-white shadow-sm transition-all"
      aria-label="Copy link"
    >
      {copied ? (
        <Check className="w-4 h-4 text-fg-teal" />
      ) : (
        <Link2 className="w-4 h-4 text-gray-500 hover:text-fg-teal" />
      )}
    </button>
  )
}

function FeaturedCard({ update }: { update: Update }) {
  const config = typeConfig[update.type]
  const Icon = config.icon

  return (
    <motion.a
      href={update.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      className="block relative bg-gradient-to-br from-fg-teal/5 to-fg-navy/5 rounded-3xl shadow-xl overflow-hidden border-2 border-fg-teal/20 mb-8 cursor-pointer group"
    >
      {/* Hero Image */}
      {update.image && (
        <div className="relative h-56 md:h-72 w-full">
          <Image
            src={update.image}
            alt={update.title}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fg-navy/70 via-fg-navy/20 to-transparent" />

          {/* Copy Link Button */}
          <div className="absolute top-4 right-4">
            <CopyLinkButton link={update.link} />
          </div>
        </div>
      )}

      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-fg-accent-teal/15 rounded-full blur-3xl" />

      <div className="relative z-10 p-6 md:p-8">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${config.gradient} text-white text-sm font-semibold mb-3`}>
          <Icon className="w-4 h-4" aria-hidden="true" />
          {config.label}
        </div>

        {/* Content */}
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-fg-navy group-hover:text-fg-teal transition-colors">
          {update.title}
        </h2>

        <p className="text-base text-gray-600 leading-relaxed mb-4 max-w-2xl line-clamp-2">
          {update.description}
        </p>

        {/* Event details */}
        {update.type === 'event' && update.eventDate && (
          <div className="flex items-center gap-4 mb-4 text-fg-teal font-semibold">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              {formatDate(update.eventDate)}
            </div>
            {update.eventTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" aria-hidden="true" />
                {update.eventTime}
              </div>
            )}
          </div>
        )}

        {/* CTA indicator */}
        <span className="inline-flex items-center gap-2 text-fg-teal font-bold text-lg group-hover:gap-3 transition-all">
          {update.linkText}
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </span>
      </div>
    </motion.a>
  )
}

function UpdateCard({ update, index }: { update: Update; index: number }) {
  const config = typeConfig[update.type]
  const Icon = config.icon

  return (
    <motion.a
      href={update.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer group"
    >
      {/* Thumbnail Image */}
      {update.image && (
        <div className="relative h-36 w-full">
          <Image
            src={update.image}
            alt={update.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Copy Link Button */}
          <div className="absolute top-3 right-3">
            <CopyLinkButton link={update.link} />
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          {/* Icon */}
          <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${config.gradient} shadow-sm`}>
            <Icon className="w-5 h-5 text-white" aria-hidden="true" />
          </div>

          {/* Badge */}
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-fg-light-blue text-fg-navy text-xs font-semibold">
            {config.label}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold mb-2 text-fg-navy group-hover:text-fg-teal transition-colors">
          {update.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
          {update.description}
        </p>

        {/* Event details */}
        {update.type === 'event' && update.eventDate && (
          <div className="flex items-center gap-2 mb-3 text-fg-teal text-sm font-medium">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            {formatDate(update.eventDate)}
            {update.eventTime && ` • ${update.eventTime}`}
          </div>
        )}

        {/* CTA indicator */}
        <span className="inline-flex items-center gap-1 text-fg-teal font-semibold text-sm group-hover:gap-2 transition-all">
          {update.linkText}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </span>
      </div>
    </motion.a>
  )
}

export default function UpdatesPage() {
  const { featured, updates } = updatesData as { featured: string; updates: Update[] }
  const [events, setEvents] = useState<CircleEvent[]>([])
  const [eventsLoading, setEventsLoading] = useState(true)

  const featuredUpdate = updates.find(u => u.id === featured)
  const otherUpdates = updates.filter(u => u.id !== featured)

  // Fetch upcoming events from Circle.so
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()

        const allEvents = data.records || data || []
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const filteredEvents = allEvents
          .filter((event: CircleEvent) => {
            const isGeneralEvents = event.space?.slug === 'general-events'
            const eventDate = new Date(event.starts_at)
            eventDate.setHours(0, 0, 0, 0)
            return isGeneralEvents && eventDate >= today
          })
          .sort((a: CircleEvent, b: CircleEvent) =>
            new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
          )
          .slice(0, 3)

        setEvents(filteredEvents)
      } catch (err) {
        console.error(err)
      } finally {
        setEventsLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1a2949 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Featured Update */}
        {featuredUpdate && <FeaturedCard update={featuredUpdate} />}

        {/* Updates Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {otherUpdates.map((update, index) => (
            <UpdateCard key={update.id} update={update} index={index} />
          ))}
        </div>

        {/* Community Section: Events + Newsletter + Impact Story */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Upcoming Events - Matches UpdateCard style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-fg-orange to-fg-yellow shadow-sm">
                  <Calendar className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-fg-light-blue text-fg-navy text-xs font-semibold">
                  Events
                </span>
              </div>

              <h3 className="text-lg font-bold mb-3 text-fg-navy">
                Upcoming Community Events
              </h3>

              {eventsLoading ? (
                <div className="space-y-3">
                  <div className="h-14 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-14 bg-gray-100 rounded-lg animate-pulse" />
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {events.map((event) => {
                    const eventDate = new Date(event.starts_at)
                    const dayOfMonth = eventDate.getDate()
                    const monthName = eventDate.toLocaleDateString('en-US', { month: 'short' })
                    const timeString = eventDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })

                    return (
                      <a
                        key={event.id}
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 hover:bg-fg-light-blue transition-colors group"
                      >
                        <div className="flex-shrink-0 bg-white rounded-md px-2 py-1 shadow-sm text-center border border-gray-100">
                          <div className="text-[10px] font-bold text-fg-teal uppercase leading-tight">{monthName}</div>
                          <div className="text-base font-bold text-fg-navy leading-tight">{dayOfMonth}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-fg-navy group-hover:text-fg-teal transition-colors truncate">
                            {event.name}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1.5">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {timeString}
                            <span className="text-gray-300">•</span>
                            {event.location_type === 'virtual' ? 'Virtual' : 'In-Person'}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">No upcoming events scheduled.</p>
              )}

              <a
                href="https://community.fostergreatness.co/c/general-events"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-fg-teal font-semibold text-sm hover:gap-2 transition-all"
              >
                View All Events
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Newsletter Signup - Matches UpdateCard style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-fg-teal to-fg-accent-teal shadow-sm">
                  <Heart className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-fg-light-blue text-fg-navy text-xs font-semibold">
                  Newsletter
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 text-fg-navy">
                Stay Connected
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Monthly updates on events, member stories, and ways to support foster youth.
              </p>

              <iframe
                src="https://subscribe-forms.beehiiv.com/adcc3240-d880-40fe-af14-c79aff6b38f9"
                data-test-id="beehiiv-embed"
                frameBorder="0"
                scrolling="no"
                className="w-full"
                style={{
                  height: '92px',
                  margin: 0,
                  backgroundColor: 'transparent',
                  maxWidth: '100%'
                }}
                title="Subscribe to Foster Greatness newsletter for monthly community updates"
              />

              <p className="text-xs text-gray-500 mt-3">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>

          {/* Impact Story - Matches UpdateCard style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-fg-navy to-fg-teal shadow-sm">
                  <Newspaper className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-fg-light-blue text-fg-navy text-xs font-semibold">
                  Story
                </span>
              </div>

              <h3 className="text-lg font-bold mb-3 text-fg-navy">
                Community Voices
              </h3>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-fg-teal/20 shadow-sm">
                    <Image
                      src="/images/rimy-morris-2.png"
                      alt="Rimy Morris"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">
                    &ldquo;I had so much fun and truly needed all of the holiday spirit and community in this event! Felt like one big happy family.&rdquo;
                  </p>
                  <p className="font-semibold text-sm text-fg-navy">Rimy Morris</p>
                  <p className="text-xs text-gray-500">Community Member</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
