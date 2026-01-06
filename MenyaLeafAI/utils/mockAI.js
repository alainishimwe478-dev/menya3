// cspell:ignore neem Fusarium miticides Alternaria
const mockProblems = {
  maize: [
    { problem: 'Maize Streak Virus', solution: 'Remove infected plants and use resistant varieties.' },
    { problem: 'Corn Borer', solution: 'Use biological control or neem-based pesticides.' },
    { problem: 'Nitrogen Deficiency', solution: 'Apply nitrogen-rich fertilizers.' },
    { problem: 'Fusarium Ear Rot', solution: 'Use fungicides and practice crop rotation.' },
  ],
  cassava: [
    { problem: 'Cassava Mosaic Disease', solution: 'Use virus-free planting material and resistant varieties.' },
    { problem: 'Cassava Brown Streak Disease', solution: 'Remove infected plants and use clean cuttings.' },
    { problem: 'Cassava Green Mite', solution: 'Apply appropriate miticides.' },
    { problem: 'Bacterial Blight', solution: 'Use copper-based fungicides and practice sanitation.' },
  ],
  greenVegetables: [
    { problem: 'Downy Mildew', solution: 'Improve air circulation and use fungicides.' },
    { problem: 'Aphid Infestation', solution: 'Use insecticidal soap or neem oil.' },
    { problem: 'Leaf Spot', solution: 'Remove affected leaves and apply fungicides.' },
    { problem: 'Nutrient Deficiency', solution: 'Test soil and apply appropriate fertilizers.' },
  ],
  sweetPotatoes: [
    { problem: 'Sweet Potato Virus Disease', solution: 'Use virus-tested planting material.' },
    { problem: 'Sweet Potato Weevil', solution: 'Crop rotation and soil treatment.' },
    { problem: 'Fusarium Wilt', solution: 'Use resistant varieties and soil sterilization.' },
    { problem: 'Alternaria Leaf Spot', solution: 'Fungicide application and proper spacing.' },
  ],
};

export const identifyProblem = (crop) => {
  const problems = mockProblems[crop];
  if (!problems) return null;
  const randomIndex = Math.floor(Math.random() * problems.length);
  return problems[randomIndex];
};
