class DNode<T> {
  value: T;
  next: DNode<T> | null = null;
  prev: DNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class Dequeue<T> {
  private head: DNode<T> | null = null;
  private tail: DNode<T> | null = null;
  private length: number = 0;

  addBefore(value: T, predicate: (a: T, b: T) => boolean): void {
    const newNode = new DNode(value);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else if (predicate(value, this.head.value)) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      let current: DNode<T> = this.head;
      while (current.next && !predicate(value, current.next.value)) {
        current = current.next;
      }

      newNode.next = current.next;

      if (current.next) {
        current.next.prev = newNode;
      } else {
        this.tail = newNode;
      }

      newNode.prev = current;
      current.next = newNode;
    }

    this.length++;
  }

  removeFirstThatMatches(predicate: (a: T) => boolean): T | null {
    if (!this.head) {
      return null;
    }

    let current: DNode<T> | null = this.head;
    while (current && !predicate(current.value)) {
      current = current.next;
    }

    if (!current) {
      return null;
    }

    if (current.next) {
      current.next.prev = current.prev;
    } else {
      this.tail = current.prev;
    }

    if (current.prev) {
      current.prev.next = current.next;
    } else {
      this.head = current.next;
    }

    this.length--;
    return current.value;
  }

  removeFromFront(): T | null {
    if (!this.head) {
      return null;
    }

    const removedValue = this.head.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      }
    }

    this.length--;
    return removedValue;
  }

  peekFront(): T | null {
    return this.head ? this.head.value : null;
  }

  hasElements(): boolean {
    return this.length !== 0;
  }

  size(): number {
    return this.length;
  }
}

export { Dequeue };
