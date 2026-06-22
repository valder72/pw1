import { initRegisterForm } from "../handlers/authHandlers.js";

const form = document.querySelector("#register-form");
const errorEl = document.querySelector("#error-msg");

initRegisterForm(form, errorEl);
