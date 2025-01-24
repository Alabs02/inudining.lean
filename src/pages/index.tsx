import Image from "next/image";
import { motion } from "framer-motion";
import { FilterChip, LocationCard, Toolbar } from "@/components/ui";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import kebabCase from "lodash/kebabCase";
import { cn } from "@/lib";
import { useEffect } from "react";
import { categories, records } from "@/constants/db";

const Home = () => {
  const router = useRouter();
  const { query } = router;

  const toggleCategory = (selectedCategory: string) => {
    const currentCategories =
      typeof query.categories === "string" ? query.categories.split(",") : [];
    const updatedCategories = currentCategories.includes(selectedCategory)
      ? currentCategories.filter((category) => category !== selectedCategory)
      : [...currentCategories, selectedCategory];

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          categories:
            updatedCategories.length > 0
              ? updatedCategories.join(",")
              : undefined,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const selectedCategories =
    typeof query.categories === "string" ? query.categories.split(",") : [];

  useEffect(() => {
    console.log(query.categories);
  }, [query]);

  return (
    <motion.div className="flex flex-col w-full min-h-screen">
      <Toolbar />

      <section className="section">
        <div>
          <div className="flex flex-wrap gap-4 w-full items-center justify-center">
            {categories.map((category) => (
              <FilterChip
                key={category.id}
                {...category}
                onClick={() => toggleCategory(kebabCase(category.query))}
                className={cn(
                  selectedCategories.includes(kebabCase(category.query)) &&
                    "!bg-accent-600 !text-accent-50"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div>
          <h3 className="text-2xl lg:text-3xl text-primary/90 font-dm-serif mb-5">Explore Welcoming Restaurants Nearby</h3>

          <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-5">
            {
              records.map((record) => (
                <LocationCard key={record.id} {...record} />
              ))
            }
          </div>
        </div>
      </section>
    </motion.div>
  );
};

Home.displayName = "Home";
export default Home;
