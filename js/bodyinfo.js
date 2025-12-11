// Normalized keys: use underscores / lowercase to match SVG IDs and predicted labels mapping
const BODY_INFO = {
  "head_face": {
    name: "Head / Face",
    anatomy: "Contains the skull, brain, eyes, nose, mouth and facial structures.",
    function: "Houses the brain (control center), senses (sight, smell, taste, hearing) and facial expression.",
    health: "Protect your head with helmets, get enough sleep, practice sun protection, and see a doctor for head injuries."
  },
  "arms_hands": {
    name: "Arms / Hands",
    anatomy: "Includes the humerus, radius, ulna, many muscles, tendons, and 27 bones in each hand.",
    function: "Support movement, reach, grasping, and fine motor skills.",
    health: "Avoid repetitive strain, take breaks when typing, do stretch exercises, and keep hands clean."
  },
  "legs_feet": {
    name: "Legs / Feet",
    anatomy: "Thigh, knee, shin bones, calf muscles, ankles and multiple foot bones.",
    function: "Support standing, walking, running and balance.",
    health: "Wear supportive shoes, stretch before activity, and manage weight for joint health."
  },
  "eye": {
    name: "Eye",
    anatomy: "Contains cornea, lens, retina and optic nerve that send visual information to the brain.",
    function: "Detects light and converts it to signals used for vision.",
    health: "Limit screen time, take breaks (20-20-20 rule), get eye exams, wear protective eyewear when needed."
  },
  "ears": {
    name: "Ears",
    anatomy: "Includes outer ear, middle ear (ossicles), and inner ear (cochlea and vestibular system).",
    function: "Sound detection and balance.",
    health: "Avoid very loud noises, use ear protection, and keep ears clean safely."
  }
};

// Helper: return a default if missing
function getBodyInfo(key){
  return BODY_INFO[key] || {
    name: key,
    anatomy: "Information not available",
    function: "",
    health: "No tips available"
  };
}
