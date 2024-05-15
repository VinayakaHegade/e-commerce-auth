import { faker } from "@faker-js/faker";
import { db } from "~/server/db";

function generateUniqueCategories(count: number): { name: string }[] {
  const categories = new Set<string>();

  while (categories.size < count) {
    const category = `${faker.commerce.department()}-${categories.size + 1}`;
    categories.add(category);
  }

  return Array.from(categories, (name) => ({ name }));
}

async function seedCategories() {
  const categories = generateUniqueCategories(100);
  await db.category.createMany({ data: categories });
}

seedCategories()
  .catch((error) => {
    console.error("Error seeding categories:", error);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
