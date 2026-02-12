# API Documentation

Complete API reference for Manuello Blog backend.

## 📡 Base URL

```
http://localhost:3000/api
```

## 📝 Posts Endpoints

### Get All Posts

```
GET /posts
```

**Query Parameters:**
- `category` (optional) - Filter by category: `entertainment`, `tech`, `sports`, `politics`
- `limit` (optional) - Maximum posts to return, default: 50

**Response:**
```json
{
  "posts": [
    {
      "id": "post_id",
      "title": "Post Title",
      "slug": "post-slug",
      "category": "tech",
      "content": "Full article content...",
      "excerpt": "Brief summary",
      "author": "Fabrizio Manuello",
      "featuredImage": "https://...",
      "createdAt": "2026-01-21T00:00:00Z",
      "updatedAt": "2026-01-21T00:00:00Z",
      "views": 150,
      "likes": 42,
      "published": true
    }
  ],
  "total": 1
}
```

**Example:**
```bash
# Get all published posts
curl http://localhost:3000/api/posts

# Get tech posts only
curl http://localhost:3000/api/posts?category=tech&limit=10
```

---

### Create Post

```
POST /posts
```

**Request Body:**
```json
{
  "title": "My Amazing Post",
  "slug": "my-amazing-post",
  "category": "tech",
  "content": "Full article content here...",
  "excerpt": "Brief summary (optional)",
  "author": "Fabrizio Manuello",
  "featuredImage": "https://example.com/image.jpg",
  "published": true
}
```

**Required Fields:**
- `title` - Post title
- `slug` - URL-friendly identifier
- `category` - One of: entertainment, tech, sports, politics
- `content` - Full article text

**Response:** Created post object with generated `id`

**Example:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "slug": "my-post",
    "category": "tech",
    "content": "Post content here",
    "author": "Fabrizio Manuello",
    "published": true
  }'
```

---

### Get Single Post

```
GET /posts/[id]
```

**Parameters:**
- `id` - Post ID

**Response:**
```json
{
  "id": "post_id",
  "title": "Post Title",
  "slug": "post-slug",
  ...
}
```

**Example:**
```bash
curl http://localhost:3000/api/posts/abc123xyz
```

---

### Update Post

```
PUT /posts/[id]
```

**Parameters:**
- `id` - Post ID

**Request Body:** Any fields to update
```json
{
  "title": "Updated Title",
  "published": true,
  "views": 200
}
```

**Response:**
```json
{
  "success": true
}
```

---

### Delete Post

```
DELETE /posts/[id]
```

**Parameters:**
- `id` - Post ID

**Response:**
```json
{
  "success": true
}
```

---

## 📊 Analytics Endpoints

### Get Statistics

```
GET /analytics/stats
```

**Response:**
```json
{
  "totalArticles": 5,
  "totalViews": 1250,
  "totalLikes": 342,
  "avgViewsPerArticle": 250,
  "postsPerCategory": {
    "entertainment": 2,
    "tech": 2,
    "sports": 1,
    "politics": 0
  },
  "lastUpdated": "2026-01-21T00:00:00Z"
}
```

**Example:**
```bash
curl http://localhost:3000/api/analytics/stats
```

---

### Track View/Like

```
POST /analytics/stats
```

**Request Body:**
```json
{
  "postId": "post_id",
  "action": "view"  // or "like"
}
```

**Response:**
```json
{
  "success": true
}
```

**Example:**
```bash
# Track a view
curl -X POST http://localhost:3000/api/analytics/stats \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "abc123xyz",
    "action": "view"
  }'

# Track a like
curl -X POST http://localhost:3000/api/analytics/stats \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "abc123xyz",
    "action": "like"
  }'
```

---

## 🏷️ Categories Endpoints

### Get All Categories

```
GET /categories
```

**Response:**
```json
[
  {
    "id": "entertainment",
    "name": "Entertainment",
    "slug": "entertainment",
    "count": 5
  },
  {
    "id": "tech",
    "name": "Tech",
    "slug": "tech",
    "count": 8
  },
  {
    "id": "sports",
    "name": "Sports",
    "slug": "sports",
    "count": 3
  },
  {
    "id": "politics",
    "name": "Politics",
    "slug": "politics",
    "count": 2
  }
]
```

**Example:**
```bash
curl http://localhost:3000/api/categories
```

---

## 🔄 Error Responses

All endpoints return appropriate HTTP status codes:

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 404 Not Found
```json
{
  "error": "Post not found"
}
```

### 500 Server Error
```json
{
  "error": "Failed to fetch posts"
}
```

---

## 🔑 Data Model

### Post Object

```typescript
interface BlogPost {
  id: string                    // Unique identifier
  title: string                 // Article title
  slug: string                  // URL-friendly identifier
  category: string              // entertainment|tech|sports|politics
  content: string               // Full article text
  excerpt: string               // Brief summary
  author: string                // Author name
  featuredImage: string         // Image URL
  createdAt: Date              // Creation timestamp
  updatedAt: Date              // Last update timestamp
  views: number                 // View count
  likes: number                 // Like count
  published: boolean            // Publication status
}
```

### Analytics Object

```typescript
interface Analytics {
  totalArticles: number         // Total published posts
  totalViews: number            // Total views across all posts
  totalLikes: number            // Total likes across all posts
  avgViewsPerArticle: number    // Average views per article
  postsPerCategory: {
    entertainment: number
    tech: number
    sports: number
    politics: number
  }
  lastUpdated: Date            // Last update time
}
```

---

## 🧪 Testing

### Using cURL

```bash
# Get all posts
curl http://localhost:3000/api/posts

# Create a post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","slug":"test","category":"tech","content":"Test content","published":true}'

# Get stats
curl http://localhost:3000/api/analytics/stats
```

### Using Postman

1. Import the collection from `/docs/postman-collection.json`
2. Set `{{base_url}}` to `http://localhost:3000/api`
3. Run requests from the collection

---

## 📋 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal issue |

---

## ⚡ Rate Limiting

Currently no rate limiting. Consider adding for production use.

## 🔐 Authentication

Currently no authentication required. Configure Firebase security rules before production deployment.

---

## 📞 Support

For API issues or questions, refer to the main [README.md](README.md) or [SETUP.md](SETUP.md).
