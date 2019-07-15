class BinomialTree {
  constructor(key) {
    this.key = key;
    this.parent = null;
    this.children = [];
    this.order = 0;
  }
  add_at_end(t) {
    var l = this.children.length;
    this.children[l] = t;
    this.order += 1;
  }
}
class BinomialHeap {
  constructor() {
    this.trees = [];
  } //**********************************************************
  extract_min() {
    if (!this.trees[0]) {
      return null;
    }
    var smallest_node = this.trees[0],
      l;
    for (var j = 0; j < this.trees.length; j++) {
      if (this.trees[j].key.total < smallest_node.key.total) {
        smallest_node = this.trees[j];
        l = j;
      }
    }
    this.trees.splice(l, 1);
    var h = new BinomialHeap();
    h.trees = smallest_node.children;
    for (var k = 0; k < h.trees.length; k++) {
      h.trees[k].parent = null;
    }
    this.merge(h)
    return smallest_node.key;
  } //******************************************************
  get_min() {
    if (!this.trees[0]) {
      return null;
    }
    var least = this.trees[0].key.total;
    for (var j = 0; j < this.trees.length; j++) {
      if (this.trees[j].key.total < least) {
        least = this.trees[j].key.total;
      }
    }
    return least;
  } //*******************************************************
  combine_roots(h) {
    this.trees = this.trees.concat(h.trees);
    this.trees.sort(function(a, b) {
      return (a.order - b.order);
    })
  } //*******************************************************
  merge(h) {
    this.combine_roots(h);
    if (!this.trees[0]) {
      return;
    }
    var i = 0;
    while (i < this.trees.length - 1) {
      var current = this.trees[i];
      var after = this.trees[i + 1];
      if (current.order == after.order) {
        if (i < this.trees.length - 2) {
          if (this.trees[i + 2].order == after.order) {
            var after_after = this.trees[i + 2];
            if (after.key.total < after_after.key.total) {
              after.add_at_end(after_after);
              after_after.parent = after;
              this.trees.splice(i + 2, 1);
            } else {
              after_after.add_at_end(after);
              after.parent = after_after;
              this.trees.splice(i + 1, 1);
            }
          }
        } else {
          if (current.key.total < after.key.total) {
            current.add_at_end(after);
            after.parent = current;
            this.trees.splice(i + 1, 1);
          } else {
            after.add_at_end(current);
            current.parent = after;
            this.trees.splice(i, 1);
          }
        }
      }
      i = i + 1;
    }
  } //*************************************************
  insert(key) {
    var g = new BinomialHeap();
    var a = new BinomialTree(key);
    var l = g.trees.length;
    g.trees[l] = a;
    this.merge(g)
    key.bheap=a;
  }
  update_priority(t)
  {
    var k,p;
    k=t.bheap;
    p=k.parent;
    while(p!=null && p.key.total>k.key.total)
    {
      var c=k.key;
      k.key.bheap=p
      k.key=p.key;
      p.key.bheap=k;
      p.key=c
      k=p
      p=p.parent;
    }
  }

 
}
var t1,t2,t3;
t1=new node(0,0,2,3);
t2=new node(0,0,1,1);
t3=new node(0,0,1,0);
var b = new BinomialHeap();
b.insert(t1);
b.insert(t2);
b.insert(t3);
/*var b = new BinomialHeap();
b.insert(5);
b.insert(7);
b.insert(9);
b.insert(1);
b.insert(2);
b.insert(11);
console.log(b.extract_min());
console.log(b.extract_min());
console.log(b.extract_min());
console.log(b.extract_min());
console.log(b.extract_min());*/
/*arr=[5,2,1,9,7,3]
arr.sort(function(a,b){return (b-a);})
cons
console.log(b.extract_min());
console.log(b.extract_min());
console.log(b.extract_min());ole.log(arr);*/