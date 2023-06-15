// Decision Tree Node class
class Node {
  constructor(feature, decision) {
    this.feature = feature;
    this.decision = decision;
    this.children = {};
  }
}

// Decision Tree class
class DecisionTree {
  constructor() {
    this.root = null;
  }

  // Method to train the decision tree
  train(data, target) {
    this.root = this.buildTree(data, target);
  }

  // Method to recursively build the decision tree
  buildTree(data, target) {
    // Check if all samples belong to the same class
    if (this.allSameClass(target)) {
      return new Node(null, target[0]);
    }

    // Find the best feature to split the data
    const bestFeature = this.getBestFeature(data, target);

    // Create a new node with the best feature
    const node = new Node(bestFeature, null);

    // Split the data based on the best feature
    const featureValues = new Set(data.map((sample) => sample[bestFeature]));
    featureValues.forEach((value) => {
      const subData = [];
      const subTarget = [];
      data.forEach((sample, index) => {
        if (sample[bestFeature] === value) {
          subData.push(data[index]);
          subTarget.push(target[index]);
        }
      });
      node.children[value] = this.buildTree(subData, subTarget);
    });

    return node;
  }

  // Method to predict the class of a sample
  predict(sample) {
    let currentNode = this.root;

    while (currentNode.decision === null) {
      const featureValue = sample[currentNode.feature];
      currentNode = currentNode.children[featureValue];
    }

    return currentNode.decision;
  }

  // Helper method to check if all samples belong to the same class
  allSameClass(target) {
    return new Set(target).size === 1;
  }

  // Helper method to find the best feature to split the data
  getBestFeature(data, target) {
    // Implement your own logic to calculate the best feature
    // For example, you can use information gain or Gini index

    // In this example, we select the first feature as the best feature
    return Object.keys(data[0])[0];
  }
}

// Example usage
const data = [
  { temperature: 'hot', humidity: 'high', windy: 'false' },
  { temperature: 'hot', humidity: 'high', windy: 'true' },
  { temperature: 'mild', humidity: 'high', windy: 'false' },
  { temperature: 'cool', humidity: 'normal', windy: 'false' },
  { temperature: 'cool', humidity: 'normal', windy: 'true' },
];

const target = ['no', 'no', 'yes', 'yes', 'no'];

const decisionTree = new DecisionTree();
decisionTree.train(data, target);

const sample = { temperature: 'mild', humidity: 'normal', windy: 'false' };
const prediction = decisionTree.predict(sample);

console.log('Prediction:', prediction);
