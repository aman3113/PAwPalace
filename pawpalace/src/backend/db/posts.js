import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
	{
		_id: uuid(),
		text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		likes: {
			likeCount: 0,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		likes: {
			likeCount: 0,
			likedBy: [],
			dislikedBy: [],
		},
		username: "shubhamsoni",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},

	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg",
		tags: ["animal", "dog", "golden retriever"],
		text: "adult Labrador retriever",
		likes: {
			likeCount: 43,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1510414696678-2415ad8474aa.jpg",
		tags: ["snow", "ice", "mountain"],
		text: "ice caves in the wild landscape photo of ice near ...",
		likes: {
			likeCount: 31,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1515376721779-7db6951da88d.jpg",
		tags: ["dog", "pet", "canine"],
		text: "@adventure.yuki frozen grass short-coated black do...",
		likes: {
			likeCount: 14,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1581804928342-4e3405e39c91.jpg",
		tags: ["canine", "pet", "mammal"],
		text: "Hiking with my dog in the woods. black labrador re...",
		likes: {
			likeCount: 7,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1574457547512-5b1646994eea.jpg",
		tags: ["dog", "human", "animal"],
		text: "Two boys hug their dogs in a leaf pile in the fall...",
		likes: {
			likeCount: 28,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1498534928137-473daa67f5c4.jpg",
		tags: ["dog", "animal", "pet"],
		text: "Bone salt and pepper schnauzer puppy",
		likes: {
			likeCount: 18,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1576707064479-3139e7e8aace.jpg",
		tags: ["animal", "canine", "dog"],
		text: "Sleeping dogs lie two dogs lying on black textile",
		likes: {
			likeCount: 0,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1500879747858-bb1845b61beb.jpg",
		tags: ["dog", "animal", "golden retriever"],
		text: "Dog in a forest at sunset dog in forest with sun r...",
		likes: {
			likeCount: 0,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1568572933382-74d440642117.jpg",
		tags: ["dog", "animal", "husky"],
		text: "black and white Husky",
		likes: {
			likeCount: 79,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1579562243430-4732bcb09d91.jpg",
		tags: ["dog", "pet", "animal"],
		text: "Milo durmiendo después de un largo día de jugar en...",
		likes: {
			likeCount: 17,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1568480541687-16c2f73eea4c.jpg",
		tags: ["dog", "beach", "shoreline"],
		text: "Gratitude short-coated tan dog on seashore",
		likes: {
			likeCount: 0,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1517884467367-ac2e21e46d0b.jpg",
		tags: ["pet", "canine", "grey"],
		text: "@adventure.yuki peekaboo adult short-coated black ...",
		likes: {
			likeCount: 43,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1548658146-f142deadf8f7.jpg",
		tags: ["dog", "grey", "puppy"],
		text: "front view of black and white puppy sitting on bro...",
		likes: {
			likeCount: 92,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1535008652995-e95986556e32.jpg",
		tags: ["human", "ocean", "nature"],
		text: "Random man walking with his dogs man and dogs on t...",
		likes: {
			likeCount: 15,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1580734075803-ac9cdb54fb03.jpg",
		tags: ["dog", "canine", "animal"],
		text: "Majestic looking dog on a lake white and brown sho...",
		likes: {
			likeCount: 3,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1558556249-076e42967a24.jpg",
		tags: ["dog", "animal", "canine"],
		text: "two puppies next to each other",
		likes: {
			likeCount: 27,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1556526588-a0bd9b5a42c3.jpg",
		tags: ["canine", "dog", "pet"],
		text: "two white dogs",
		likes: {
			likeCount: 54,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1575495679620-2ff225c75d5a.jpg",
		tags: ["pet", "animal", "mammal"],
		text: "A picture of my golden doodle, Yogi Bear white dog",
		likes: {
			likeCount: 20,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1549937334-e94f33e69787.jpg",
		tags: ["dog", "pet", "mammal"],
		text: "long-coated brown dog",
		likes: {
			likeCount: 5,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		_id: uuid(),
		image: "https://img.dummyapi.io/photo-1564849444446-f876dcef378e.jpg",
		tags: ["plant", "mammal", "pet"],
		text: "A feral cat short-fur gray and orange cat on green...",
		likes: {
			likeCount: 40,
			likedBy: [],
			dislikedBy: [],
		},
		username: "adarshbalika",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
];
