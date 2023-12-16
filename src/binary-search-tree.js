const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (!this.rootNode) {
      this.rootNode = new Node(data);
    }
    this.rootNode = this._addNode(this.rootNode, data);
  }

  _addNode(node, data) {
    if (!node) {
      return new Node(data);
    }
    if (data < node.data) {
      node.left = this._addNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._addNode(node.right, data);
    }
    return node;
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    return this._findNode(this.rootNode, data);
  }

  _findNode(node, data) {
    if (!node) {
      return null;
    }
    if (data === node.data) {
      return node;
    }
    if (data < node.data) {
      return this._findNode(node.left, data);
    }
    return this._findNode(node.right, data);
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      const minValue = this.min(node.right);
      node.data = minValue;
      node.right = this._removeNode(node.right, minValue);
    }
    return node;
  }

  min(node) {
    if (!node) {
      node = this.rootNode;
    }
    while (node.left) {
      node = node.left;
    }
    return node?.data;
  }

  max() {
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node?.data;
  }
}

module.exports = {
  BinarySearchTree
};