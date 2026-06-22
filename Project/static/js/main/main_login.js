import { initLoginForm } from "../handlers/authHandlers.js";

const form = document.querySelector("#login-form");
const errorEl = document.querySelector("#error-msg");

initLoginForm(form, errorEl);
