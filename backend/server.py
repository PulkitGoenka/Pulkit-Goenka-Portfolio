from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
import uuid
from pathlib import Path
from datetime import datetime, timezone
from typing import List, Annotated, Any
from pydantic import BaseModel, Field, ConfigDict, EmailStr, BeforeValidator


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def coerce_object_id(v: Any) -> Any:
    if isinstance(v, ObjectId):
        return str(v)
    return v


PyObjectId = Annotated[str, BeforeValidator(coerce_object_id)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)
    id: PyObjectId = Field(default_factory=lambda: str(uuid.uuid4()))

    def to_mongo(self) -> dict:
        doc = self.model_dump()
        doc["_id"] = doc.pop("id", None) or str(uuid.uuid4())
        return doc

    @classmethod
    def from_mongo(cls, doc: dict):
        data = dict(doc or {})
        if isinstance(data.get("_id"), ObjectId):
            data["_id"] = str(data["_id"])
        if "_id" in data:
            data["id"] = data.pop("_id")
        return cls(**data)


class Project(BaseDocument):
    slug: str
    title: str
    category: str
    description: str
    image: str
    tags: List[str] = []
    accent: str = "cyan"


class BlogPost(BaseDocument):
    slug: str
    title: str
    excerpt: str
    content: List[str] = []
    cover_image: str = ""
    tags: List[str] = []
    read_minutes: int = 4
    published_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    message: str = Field(min_length=10, max_length=5000)


class ContactMessage(BaseDocument):
    name: str
    email: str
    message: str
    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


IMG = "https://static.prod-images.emergentagent.com/jobs/120aacf6-cfec-4786-9cfe-be5507eda96f/images/"

PROJECT_SEEDS = [
    {
        "slug": "self-checkout",
        "title": "Self Checkout",
        "category": "Retail Tech",
        "description": "A QR-based self-checkout system that lets shoppers scan, pay and walk out — Java Spring Boot backend with a React kiosk UI.",
        "image": IMG + "f159c1168395a93c27ea974e6dfbe07abd4a79063622b2c99a6d9146f91a5004.jpeg",
        "tags": ["Java", "Spring Boot", "React", "MongoDB"],
        "accent": "cyan",
    },
    {
        "slug": "crm",
        "title": "CRM Platform",
        "category": "SaaS Dashboard",
        "description": "Customer relationship management platform with lead pipelines, role-based access and sales analytics for growing teams.",
        "image": IMG + "321b37ba727f170a4060d98948f6ad4d072c46a44300ae8700869ca1d6b9d533.jpeg",
        "tags": ["Java", "Spring Boot", "MySQL", "React"],
        "accent": "pink",
    },
    {
        "slug": "policy-management",
        "title": "Policy Management System",
        "category": "Enterprise Software",
        "description": "End-to-end insurance policy management — policy creation, renewals, claims tracking and reporting with full audit trails.",
        "image": IMG + "f34d85fa504643b4635dd943228ba09f09b6c48db00791daf4b1cc12763c190d.jpeg",
        "tags": ["Java", "Spring Boot", "PostgreSQL", "React"],
        "accent": "purple",
    },
]

BLOG_SEEDS = [
    {
        "slug": "self-checkout-with-java-spring-boot",
        "title": "Building a Self-Checkout System with Java & Spring Boot",
        "excerpt": "How I designed the checkout flow, kept the payment path idempotent, and what a kiosk UI taught me about the backend.",
        "cover_image": IMG + "4d6c2b391db6ced01a2269eeae61b8d6be29a1647668bc266368a33c3d95fa80.jpeg",
        "tags": ["Java", "Spring Boot", "Case Study"],
        "read_minutes": 5,
        "published_at": "2026-01-14T09:00:00.000000+00:00",
        "content": [
            "A self-checkout system sounds simple: scan items, pay, leave. But the moment two people can scan the same QR code, or a payment can succeed twice, you are doing real distributed-systems work. That is what made building mine so much fun.",
            "The core of the backend is a session-based flow built with Spring Boot. Every kiosk session gets a signed token, and every scan appends an immutable line item to that session. The cart is never 'edited' — it is only ever appended to, which makes debugging production issues dramatically easier.",
            "The trickiest part was the payment path. Networks fail, and the worst failure mode is charging someone twice. I made every payment request idempotent by requiring a client-generated idempotency key; a retry with the same key returns the original result instead of creating a second charge.",
            "The kiosk front end is a React app tuned for one hand and zero patience. Buttons are huge, states are obvious, and every screen has exactly one next action. If the API is slow, the UI says so instead of freezing.",
            "If I rebuilt it tomorrow, I would move the receipt generation out of the request path entirely. It works fine today, but publishing an event and letting a worker handle receipts would keep payment latency flat even when the printer service has a bad day.",
        ],
    },
    {
        "slug": "lessons-from-my-first-crm",
        "title": "What I Learned Writing My First CRM from Scratch",
        "excerpt": "Pipelines, permissions and pagination — the three things that quietly decide whether a CRM is usable or a nightmare.",
        "cover_image": IMG + "19e23be13f0f8a425cdafe79e6b1a6f23c27f7059475c233c9d880bdcb759cad.jpeg",
        "tags": ["Backend", "Databases", "Case Study"],
        "read_minutes": 6,
        "published_at": "2026-01-02T09:00:00.000000+00:00",
        "content": [
            "My first CRM started as a side project and ended up teaching me more about data modeling than any tutorial ever did. A CRM is basically a giant, opinionated to-do list about human beings — and human beings are messy.",
            "The first lesson was pipelines. I initially hard-coded stages like 'New', 'Contacted', 'Won'. Every sales team that touched it wanted different names. The fix was to make stages data: a pipeline owns an ordered list of stages, and deals just point at one. One afternoon of modeling saved months of special cases.",
            "The second lesson was permissions. Role-based access sounds like an add-on, but if you don't design it into the schema early, every query afterwards becomes 'and also, can this user see this row?'. I ended up with a simple rule set enforced in the service layer, and it has held up well.",
            "The third lesson was pagination. Importing a real customer dataset made the naive 'load everything' list view fall over instantly. Keyset pagination on the cursor of last updated time fixed it, and the UI now feels instant even on tens of thousands of rows.",
            "The biggest surprise was how much of the work was not code: defining what counts as a duplicate contact, deciding who owns a deal when two users edit it. Software for people is mostly about agreeing on rules, then encoding them.",
        ],
    },
    {
        "slug": "small-habits-better-rest-apis",
        "title": "Small Habits That Make My REST APIs Better",
        "excerpt": "Consistent error shapes, versioned URLs, and honest status codes — tiny habits that pay off the moment a second client arrives.",
        "cover_image": IMG + "0247eddba99dedea5a934ceeb68fef71da06447b38eb3b0fcc4f68c496b260ed.jpeg",
        "tags": ["APIs", "Best Practices"],
        "read_minutes": 4,
        "published_at": "2025-12-18T09:00:00.000000+00:00",
        "content": [
            "You do not need a big architecture review to write better APIs. A handful of small habits, applied every single time, get you most of the way there.",
            "Habit one: return errors in one consistent shape. Every error response has a code, a human-readable message and optional details. Frontend teams stop asking 'what does this endpoint return on failure?' because the answer is always the same.",
            "Habit two: version the URL from day one. /api/v1/... costs nothing today and saves a painful migration the day you need to change a response shape. Renaming a field without a version is a bet you will eventually lose.",
            "Habit three: use honest status codes. A 200 with an error body is a lie that breaks caching, monitoring and client logic all at once. 201 for created, 204 for deleted, 409 for conflicts — the verbs are free.",
            "Habit four: write the docs comment before the endpoint, not after. When the shape is written down first, implementation becomes mechanical, and drift between docs and behavior never gets a chance to start.",
        ],
    },
]


async def seed_database():
    try:
        if await db.projects.count_documents({}) == 0:
            await db.projects.insert_many(
                [Project(**p).to_mongo() for p in PROJECT_SEEDS]
            )
            logger.info("Seeded projects collection")
        if await db.blog_posts.count_documents({}) == 0:
            await db.blog_posts.insert_many(
                [BlogPost(**p).to_mongo() for p in BLOG_SEEDS]
            )
            logger.info("Seeded blog_posts collection")
    except Exception as e:
        logger.error(f"Seeding failed: {e}")


@app.on_event("startup")
async def startup():
    await seed_database()


@api_router.get("/")
async def root():
    return {"message": "Pulkit Goenka — portfolio API is running"}


@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    docs = await db.projects.find().to_list(100)
    return [Project.from_mongo(d) for d in docs]


@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    docs = await db.blog_posts.find().sort("published_at", -1).to_list(100)
    return [BlogPost.from_mongo(d) for d in docs]


@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    doc = await db.blog_posts.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    return BlogPost.from_mongo(doc)


@api_router.post("/contact", status_code=201)
async def create_contact_message(payload: ContactMessageCreate):
    msg = ContactMessage(
        name=payload.name.strip(),
        email=payload.email,
        message=payload.message.strip(),
    )
    result = await db.contact_messages.insert_one(msg.to_mongo())
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to save message")
    return {
        "status": "success",
        "message": "Thanks for reaching out! I'll get back to you soon.",
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
