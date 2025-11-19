# What's Happening Content Guide

## Quick Start

Edit `updates.json` to change the content in the "What's Happening" section.

## File Structure

```json
{
  "featured": "gingerbread-contest-2025",  // ID of the large featured card
  "updates": [
    {
      "id": "unique-id",
      "type": "donate",
      "title": "Card Title",
      "description": "Card description text",
      "date": "2025-11-18",
      "link": "https://...",
      "linkText": "Button Text",
      "image": "/images/your-image.png"
    }
  ]
}
```

## Fields Explained

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier (use lowercase with hyphens) |
| `type` | Yes | Card type: `donate`, `event`, `page`, `video`, `resource` |
| `title` | Yes | Main headline |
| `description` | Yes | Supporting text (2-3 sentences recommended) |
| `date` | Yes | ISO date format: `YYYY-MM-DD` |
| `link` | Yes | Full URL where the card links to |
| `linkText` | Yes | Call-to-action button text |
| `image` | Yes | Image path starting with `/images/` |
| `published` | No | Set to `false` to hide. Defaults to `true` |

## Card Types

- **donate** - Coral/orange badge, for fundraising campaigns
- **event** - Teal badge, for upcoming events
- **page** - Navy badge, for website pages/resources
- **video** - Purple badge, for video content
- **resource** - Green badge, for downloadable resources

## Adding New Content

1. Add your image to `/public/images/`
2. Add a new object to the `updates` array:

```json
{
  "id": "my-new-update",
  "type": "donate",
  "title": "My New Campaign",
  "description": "Description of what this is about.",
  "date": "2025-12-01",
  "link": "https://fostergreatness.co/my-page",
  "linkText": "Learn More",
  "image": "/images/my-image.png"
}
```

3. To make it the featured (large) card, set `"featured": "my-new-update"`

## Changing the Featured Card

The `featured` field at the top determines which update appears as the large card with Rimy's testimonial quote beside it. All other updates appear in the news feed style below.

```json
{
  "featured": "crisis-fund",  // Change this ID
  "updates": [...]
}
```

## Image Guidelines

- **Recommended size**: 800x600px or similar 4:3 ratio
- **Format**: PNG, JPG, or WebP
- **Location**: Place in `/public/images/`
- **Path format**: `/images/filename.png` (no `/public` prefix)

## Display Order

Updates appear in the order listed in the array. The featured card is pulled out separately, so reorder the array to change the news feed order.

## What's Automatic

These sections pull from APIs and don't need manual updates:
- **Upcoming Events** - From Circle.so
- **Latest Newsletters** - From Beehiiv

## Example: Swap Holiday Campaign

To replace the gingerbread campaign with a new one:

1. Upload new image to `/public/images/new-campaign.png`
2. Edit `updates.json`:

```json
{
  "featured": "winter-drive-2025",
  "updates": [
    {
      "id": "winter-drive-2025",
      "type": "donate",
      "title": "Winter Essentials Drive",
      "description": "Help provide warm clothing and essentials...",
      "date": "2025-12-15",
      "link": "https://fostergreatness.co/winter-drive",
      "linkText": "Donate Now",
      "image": "/images/new-campaign.png"
    },
    // ... other updates
  ]
}
```

3. Save the file - changes appear immediately in dev, or after deploy in production.
