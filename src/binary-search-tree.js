const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor(root_node) {
    this.all_node = [];
    if (root_node) this.root_node = this.#set_elem(root_node);
  }
  root() {
    if (this.root_node) {
      return this.root_node;
    } else {
      return null;
    }
  }

  #set_elem(x) {
    return { data: x };
  }

  #all_nodes(node) {
    if (node.left) {
      this.all_node.push(node.left.data);
      this.#all_nodes(node.left);
    }
    if (node.right) {
      this.all_node.push(node.right.data);
      this.#all_nodes(node.right);
    }
  }

  add(data) {
    if (!data) return;
    const find_free_ctx = find_free.bind(this);
    this.root_node ? find_free_ctx(data, this.root_node) : (this.root_node = this.#set_elem(data));

    function find_free(data, node) {
      if (data < node.data) {
        if (!node.left) {
          node.left = this.#set_elem(data);
        } else {
          find_free_ctx(data, node.left);
          return;
        }
      } else if (data > node.data) {
        if (!node.right) {
          node.right = this.#set_elem(data);
        } else {
          find_free_ctx(data, node.right);
          return;
        }
      } else {
        return;
      }
    }
  }

  has(data) {
    let search_this = search.bind(this);
    let found = false;

    if (this.root_node) {
      search_this(data, this.root_node);
      return found;
    } else {
      return false;
    }

    function search(data, node) {
      if (data < node.data) {
        if (!node.left) {
          return;
        } else {
          search(data, node.left);
        }
      } else if (data > node.data) {
        if (!node.right) {
          return;
        } else {
          search(data, node.right);
        }
      } else {
        found = true;
        return;
      }
    }
  }

  find(data) {
    let search_ctx = search.bind(this);
    let found = null;

    if (this.root_node) {
      search_ctx(data, this.root_node);
    }
    return found;

    function search(data, node) {
      if (data < node.data) {
        if (!node.left) {
          found = null;
          return;
        } else {
          search_ctx(data, node.left);
        }
      } else if (data > node.data) {
        if (!node.right) {
          found = null;
          return;
        } else {
          search_ctx(data, node.right);
        }
      } else {
        found = node;
        return;
      }
    }
  }

  remove(data) {
    let search_ctx = search.bind(this);
    let parent = this;
    let branch = "root_node";
    this.all_node = [];

    search_ctx(data, this.root_node);

    function search(data, node) {
      if (data < node.data) {
        branch = "left";
        if (!node.left) {
          return;
        } else {
          parent = node;
          search_ctx(data, node.left);
        }
      } else if (data > node.data) {
        branch = "right";

        if (!node.right) {
          return;
        } else {
          parent = node;
          search_ctx(data, node.right);
        }
      } else {
        this.#all_nodes(node);
        delete parent[branch];
        this.all_node.forEach((item) => {
          this.add(item);
        });
        return;
      }
    }
  }

  min() {
    this.all_node = [];
    let res = null;

    if (this.root_node) {
      this.all_node.push(this.root_node.data);
      this.#all_nodes(this.root_node);
      res = Math.min(...this.all_node);
    }
    return res;
  }

  max() {
    this.all_node = [];
    let res = null;

    if (this.root_node) {
      this.all_node.push(this.root_node.data);
      this.#all_nodes(this.root_node);
      res = Math.max(...this.all_node);
    }
    return res;
  }
}

module.exports = {
  BinarySearchTree,
};
