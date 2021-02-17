const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  /*const c = new Campground({
        title: 'purple field'
    });*/
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "600d928104d0a11ec8396c25",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      //
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A magni amet vel accusamus suscipit itaque repudiandae doloribus quas maiores iusto eveniet omnis exercitationem commodi, ut minus voluptatem earum repellat ipsum?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/dhv7ou3gc/image/upload/v1612636035/YelpCamp/rjxvgwpbbliik8yemdpc.jpg",
          filename: "YelpCamp/rjxvgwpbbliik8yemdpc",
        },
        {
          url:
            "https://res.cloudinary.com/dhv7ou3gc/image/upload/v1612636036/YelpCamp/gax5sm0jtfstyhnl4jdx.jpg",
          filename: "YelpCamp/gax5sm0jtfstyhnl4jdx",
        },
        {
          url:
            "https://res.cloudinary.com/dhv7ou3gc/image/upload/v1612636035/YelpCamp/vkepfdj8cf3egic2ipgi.jpg",
          filename: "YelpCamp/vkepfdj8cf3egic2ipgi",
        },
        {
          url:
            "https://res.cloudinary.com/dhv7ou3gc/image/upload/v1612636036/YelpCamp/gtm9uvuhc9phqgt5rvux.jpg",
          filename: "YelpCamp/gtm9uvuhc9phqgt5rvux",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
