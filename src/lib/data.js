const USERS_KEY = "bookapp_users";
const BOOKS_KEY = "bookapp_books";
const REVIEWS_KEY = "bookapp_reviews";
const SESSION_KEY = "bookapp_session";

const defaultBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image_url:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description:
      "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image_url:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    description:
      "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    image_url:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    description:
      "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image_url:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    description:
      "A romantic novel following the character development of Elizabeth Bennet.",
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    image_url:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop",
    description:
      "The story of teenage angst and alienation, narrated by the iconic Holden Caulfield.",
  },
  {
    id: "6",
    title: "Brave New World",
    author: "Aldous Huxley",
    image_url:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    description:
      "A dystopian novel set in a futuristic World State of genetically modified citizens.",
  },
];

const defaultReviews = [
  {
    id: "r1",
    book_id: "1",
    username: "reader42",
    rating: 5,
    review_text:
      "A masterpiece of American literature. The prose is simply breathtaking.",
    created_at: "2025-12-01T10:00:00Z",
  },
  {
    id: "r2",
    book_id: "1",
    username: "litfan",
    rating: 4,
    review_text:
      "Beautifully written, though the characters can be hard to sympathize with.",
    created_at: "2025-12-15T14:30:00Z",
  },
  {
    id: "r3",
    book_id: "2",
    username: "bookworm",
    rating: 5,
    review_text:
      "Everyone should read this at least once. Timeless and powerful.",
    created_at: "2026-01-05T09:15:00Z",
  },
  {
    id: "r4",
    book_id: "3",
    username: "reader42",
    rating: 5,
    review_text: "Terrifyingly relevant. Orwell was a prophet.",
    created_at: "2026-01-20T16:45:00Z",
  },
];

function getStored(key, fallback) {
  const raw = localStorage.getItem(key);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(key, JSON.stringify(fallback));
  return fallback;
}

function setStored(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Users
export function getUsers() {
  return getStored(USERS_KEY, []);
}
export function registerUser(username, password) {
  const users = getUsers();
  if (users.find((u) => u.username === username))
    return { success: false, error: "Username already taken" };
  users.push({ id: crypto.randomUUID(), username, password });
  setStored(USERS_KEY, users);
  return { success: true };
}
export function loginUser(username, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) return { success: false, error: "Invalid credentials" };
  localStorage.setItem(SESSION_KEY, username);
  return { success: true };
}
export function getSession() {
  return localStorage.getItem(SESSION_KEY);
}
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

// Books
export function getBooks() {
  return getStored(BOOKS_KEY, defaultBooks);
}
export function addBook(book) {
  const books = getBooks();
  const newBook = { ...book, id: crypto.randomUUID() };
  books.push(newBook);
  setStored(BOOKS_KEY, books);
  return newBook;
}
export function searchBooks(query) {
  const q = query.toLowerCase();
  return getBooks().filter(
    (b) =>
      b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q),
  );
}

// Reviews
export function getReviews() {
  return getStored(REVIEWS_KEY, defaultReviews);
}
export function getBookReviews(bookId) {
  return getReviews()
    .filter((r) => r.book_id === bookId)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
}
export function addReview(review) {
  const reviews = getReviews();
  const newReview = {
    ...review,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  reviews.push(newReview);
  setStored(REVIEWS_KEY, reviews);
  return newReview;
}
export function getAverageRating(bookId) {
  const reviews = getBookReviews(bookId);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}
