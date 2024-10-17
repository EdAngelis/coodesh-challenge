import fs from "fs";
import readline from "readline";

async function selectObjectsFromJson(filePath, limit) {
  const objects = [];

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let count = 0;

  for await (const line of rl) {
    if (count >= limit) break;

    try {
      const data = JSON.parse(line);

      const product = {
        code: parseInt(data.code),
        status: "draft",
        imported_t: Date.now(),
        url: data.url,
        creator: data.creator,
        created_t: new Date(data.created_t),
        last_modified_t: new Date(data.last_modified_t),
        product_name: data.product_name,
        quantity: data.quantity,
        brands: data.brands,
        categories: data.categories,
        labels: data.labels,
        cities: data.cities,
        purchase_places: data.purchase_places,
        stores: data.stores,
        ingredients_text: data.ingredients_text,
        traces: data.traces,
        serving_size: data.serving_size,
        serving_quantity: parseInt(data.serving_quantity),
        nutriscore_score: parseInt(data.nutriscore_score),
        nutriscore_grade: data.nutriscore_grade,
        main_category: data.main_category,
        image_url: data.image_url,
      };

      objects.push(product);
      count++;
    } catch (err) {
      console.error(`Error parsing line: ${err}`);
    }
  }
  return objects;
}

export default selectObjectsFromJson;
