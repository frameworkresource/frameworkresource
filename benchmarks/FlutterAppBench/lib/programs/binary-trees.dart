/* The Computer Language Benchmarks Game
   https://salsa.debian.org/benchmarksgame-team/benchmarksgame/

   transliterated from Andrey Filatkin's Node #6 program by Isaac Gouy
*/

// 21/05/2022
// https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/binarytrees-dartexe-6.html

void runBinary(final int maxDepth, StringSink writer) {
  final stretchDepth = maxDepth + 1;
  final check = itemCheck(bottomUpTree(stretchDepth));
  writer.writeln("stretch tree of depth $stretchDepth\t check: $check");

  final longLivedTree = bottomUpTree(maxDepth);

  for (var depth = 4; depth <= maxDepth; depth += 2) {
    final iterations = 1 << maxDepth - depth + 4;
    work(iterations, depth, writer);
  }

  writer.writeln(
      "long lived tree of depth $maxDepth\t check: ${itemCheck(longLivedTree)}");
}

void work(int iterations, int depth, StringSink writer) {
  var check = 0;
  for (int i = 0; i < iterations; i++) {
    check += itemCheck(bottomUpTree(depth));
  }
  writer.writeln("$iterations\t trees of depth $depth\t check: $check");
}

class TreeNode {
  TreeNode? left, right;
  TreeNode(this.left, this.right);
}

int itemCheck(TreeNode? node) {
  if (node == null || node.left == null) {
    return 1;
  } else {
    return 1 + itemCheck(node.left) + itemCheck(node.right);
  }
}

TreeNode bottomUpTree(int depth) {
  return depth > 0
      ? TreeNode(bottomUpTree(depth - 1), bottomUpTree(depth - 1))
      : TreeNode(null, null);
}