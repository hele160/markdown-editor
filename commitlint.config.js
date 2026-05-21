export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0], // 关闭 subject 大小写限制
  },
};
