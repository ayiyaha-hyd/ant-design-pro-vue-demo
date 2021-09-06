/**
 * 获取用户权限
 * @returns {string[]}
 */
export function getCurrentAuthority() {
  return ["admin"];
  // return ["user"];
}

/**
 * 权限校验
 * @param authority
 * @returns {boolean}
 */
export function check(authority) {
  const current = getCurrentAuthority();
  // TODO 了解 some,includes用法
  return current.some((item) => authority.includes(item));
}

/**
 * 判断是否登录
 * @returns {boolean}
 */
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
