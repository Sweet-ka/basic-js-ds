const { NotImplementedError } = require("../extensions/index.js");

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor(x) {
    if (x) {
      this.list = { value: x, next: null };
    } else {
      this.list = null;
    }
  }

  getUnderlyingList() {
    return this.list;
  }

  enqueue(value) {
    const next_value_ctx = next_value.bind(this);

    if (this.list === null) {
      this.list = { value: value, next: null };
    } else {
      next_value_ctx(this.list);
    }

    function next_value(list) {
      if (list.next === null) {
        list.next = { value: value, next: null };
        return this.list;
      } else {
        next_value_ctx(list.next);
      }
    }
  }

  dequeue() {
    let first;
    if (this.list !== null) {
      first = this.list.value;
      this.list = this.list.next;
    }
    return first;
  }
}

module.exports = {
  Queue,
};
