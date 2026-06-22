import { checkAuthNav } from "../handlers/authHandlers.js";
import { loadNews, searchNews, loadPostOptions } from "../handlers/newsHandlers.js";
import { loadComments, initFeedbackForm } from "../handlers/feedbackHandler.js";
import { initQuiz } from "../handlers/quizHandler.js";

const newsContainer = document.querySelector("#news-container");
const spinner = document.querySelector("#spinner");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");
const searchBtn = document.querySelector("#search-button");

const postSelect = document.querySelector("#post-select");
const feedbackForm = document.querySelector("#feedback-form");
const messageEl = document.querySelector("#message");

const commentsList = document.querySelector("#comments-list");
const commentsSpinner = document.querySelector("#comments-spinner");

const quizForm = document.querySelector("#quiz-form");
const quizResult = document.querySelector("#quiz-result");

const loginBtn = document.querySelector("#login-btn");

checkAuthNav(loginBtn);

loadNews(newsContainer, spinner);
loadPostOptions(postSelect);
loadComments(commentsList, commentsSpinner);

setInterval(() => {
  if (!searchInput.value.trim()) loadNews(newsContainer, spinner);
  loadComments(commentsList, commentsSpinner);
}, 20000);

initFeedbackForm(feedbackForm, {
  selectEl: postSelect,
  messageEl,
  commentsList, 
  commentsSpinner
});

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  searchBtn.disabled = true;
  searchBtn.textContent = "";
  const spinnerSpan = document.createElement("span");
  spinnerSpan.className = "spinner-border spinner-border-sm";
  spinnerSpan.setAttribute("aria-hidden", "true");
  searchBtn.append(spinnerSpan, " Пошук...");

  await searchNews(query, newsContainer);

  searchBtn.disabled = false;
  searchBtn.textContent = "Пошук";
});

initQuiz(quizForm, quizResult);
