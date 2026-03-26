// entities/guestbook public API
// 외부 레이어(features, widgets, app)는 이 파일을 통해서만 접근

export { createGuestbook } from "./api/createGuestbook";
export { getGuestbook } from "./api/getGuestbook";
export { updateGuestbook } from "./api/updateGuestbook";
