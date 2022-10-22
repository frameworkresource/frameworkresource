import { write } from "./writeFile";

var output = [];

async function binarytree(param) {
  return await mainThread(param);
};

async function mainThread (param) {
  const maxDepth = Math.max(6, param);

  const stretchDepth = maxDepth + 1;
  const check = itemCheck(bottomUpTree(stretchDepth));
  output.push(`stretch tree of depth ${stretchDepth}\t check: ${check}`);

  const longLivedTree = bottomUpTree(maxDepth);

  for (let depth = 4; depth <= maxDepth; depth += 2) {
    const iterations = 1 << (maxDepth - depth + 4);
    work(iterations, depth);
  }
  output.push(`long lived tree of depth ${maxDepth}\t check: ${itemCheck(longLivedTree)}`);

  await write(output.join("\n"));
  return 'finished';
};

const work = (iterations, depth) => {
  let check = 0;
  for (let i = 0; i < iterations; i++) {
    check += itemCheck(bottomUpTree(depth));
  }
  output.push(`${iterations}\t trees of depth ${depth}\t check: ${check}`);
};

const TreeNode = (left, right) => {
  return {left, right};
};

const itemCheck = node => {
  if (node.left === null) {
    return 1;
  }
  return 1 + itemCheck(node.left) + itemCheck(node.right);
};

const bottomUpTree = depth => {
  return depth > 0
    ? new TreeNode(bottomUpTree(depth - 1), bottomUpTree(depth - 1))
    : new TreeNode(null, null);
};

export default binarytree;
