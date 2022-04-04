class Node {
  constructor(data, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.data = data;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  // * Add Node to the BST
  add(data) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(data);
      return;
    } else {
      const searchTree = (node) => {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }
  // * Find Node with minimum value
  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }
  // * Find Node with maximum value
  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
  // * Check and return the Node if present
  find(data) {
    let current = this.root;
    while (data !== current.data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }
  // * Check whether a node is Present
  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }
  // * Remove a Node from BST
  remove(data) {
    const removeNode = (node, data) => {
      if (node == null) return null;
      if (data == node.data) {
        //* Node has no children
        if (node.left == null && node.right == null) return null;
        //* Node has no left child
        if (node.left == null) return node.right;
        //* Node has no right child
        if (node.right == null) return node.left;
        //* Node has both children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }
  // * InOrder Traversal
  inOrder(node = this.root) {
    if (this.root == null) return null;
    const nodes = [];
    const inOrderTraversal = (node) => {
      node.left && inOrderTraversal(node.left);
      nodes.push(node.data);
      node.right && inOrderTraversal(node.right);
    };
    inOrderTraversal(node);
    return nodes;
  }
  // * PreOrder Traversal
  preOrder(node = this.root) {
    if (this.root == null) return null;
    const nodes = [];
    const preOrderTraversal = (node) => {
      nodes.push(node.data);
      node.left && preOrderTraversal(node.left);
      node.right && preOrderTraversal(node.right);
    };
    preOrderTraversal(node);
    return nodes;
  }
  // * PostOrder Traversal
  postOrder(node = this.root) {
    if (this.root == null) return null;
    const nodes = [];
    const postOrderTraversal = (node) => {
      node.left && postOrderTraversal(node.left);
      node.right && postOrderTraversal(node.right);
      nodes.push(node.data);
    };
    postOrderTraversal(node);
    return nodes;
  }
  // * Level Order Traversal
  levelOrder() {
    const result = [];
    const Q = [];
    if (this.root !== null) {
      Q.push(this.root);
      while (Q.length > 0) {
        const node = Q.shift();
        result.push(node.data);
        if (node.left !== null) {
          Q.push(node.left);
        }
        if (node.right !== null) {
          Q.push(node.right);
        }
      }
      return result;
    } else return null;
  }
  // * Find Min Height of a BST
  minHeight(node = this.root) {
    if (node == null) return -1;
    let left = this.minHeight(node.left);
    let right = this.minHeight(node.right);
    if (left < right) return left + 1;
    else return right + 1;
  }
  // * Find Max Height of a BST
  maxHeight(node = this.root) {
    if (node == null) return -1;
    let left = this.maxHeight(node.left);
    let right = this.maxHeight(node.right);
    if (left > right) return left + 1;
    else return right + 1;
  }
  // * Check if Given BST is a balanced Tree
  isBalanced() {
    return this.minHeight() >= this.maxHeight() - 1;
  }
}

const myTree = new BST();
myTree.add(9);
myTree.add(15);
myTree.add(8);
myTree.add(22);
myTree.add(7);
console.log('Min Height', myTree.minHeight());
console.log('max Height', myTree.maxHeight());
console.log('Is Balanced?', myTree.isBalanced());
console.log('In Order', myTree.inOrder());
console.log('Pre Order', myTree.preOrder());
console.log('Post Order', myTree.postOrder());
console.log('Level Order', myTree.levelOrder());
