'use strict';
const $form = document.querySelector('#entry-form');
const $urlPreview = document.querySelector('#url-preview');
const $photoUrlInput = document.querySelector('#photo-url');
if (!$form) throw new Error('$form query failed!');
if (!$urlPreview) throw new Error('$urlPreview query failed!');
if (!$photoUrlInput) throw new Error('$photoUrlInput query failed!');
$photoUrlInput.addEventListener('input', function (event) {
  const target = event.target;
  $urlPreview.src = target.value || 'images/placeholder-image-square.jpg';
});
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const newEntry = {
    entryId: data.nextEntryId,
    title: $form.elements.namedItem('title').value,
    photoUrl: $photoUrlInput.value,
    content: $form.elements.namedItem('content').value,
  };
  const $newEntryElement = renderEntry(newEntry);
  const $entryList = document.getElementById('entry-list');
  if ($entryList && $newEntryElement) {
    $entryList.appendChild($newEntryElement);
  }
  toggleNoEntries();
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  writeData();
  $form.reset();
  $urlPreview.src = 'images/placeholder-image-square.jpg';
});
function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.classList.add('row');
  const $imgWrapper = document.createElement('div');
  $imgWrapper.classList.add('column-half');
  const $img = document.createElement('img');
  $img.src = entry.photoUrl;
  $img.alt = `${entry.title}`;
  $img.classList.add('url-preview');
  const $div = document.createElement('div');
  $div.classList.add('column-half');
  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  const $p = document.createElement('p');
  $p.textContent = entry.content;
  $li.appendChild($imgWrapper);
  $li.appendChild($div);
  $div.appendChild($h2);
  $div.appendChild($p);
  $imgWrapper.appendChild($img);
  return $li;
}
document.addEventListener('DOMContentLoaded', function () {
  const validViews = ['entries', 'entry-form'];
  let initialView;
  if (validViews.includes(data.view)) {
    initialView = data.view;
  } else {
    initialView = 'entries';
  }
  viewSwap(initialView);
  const $ul = document.querySelector('ul');
  if (!$ul) throw new Error('$ul query has failed!');
  data.entries.forEach((entry) => {
    const entryElement = renderEntry(entry);
    $ul.appendChild(entryElement);
  });
  toggleNoEntries();
});
function toggleNoEntries() {
  const $noEntries = document.querySelector('.no-entries');
  if (!$noEntries) throw new Error('No entries!');
  if (data.entries.length === 0) {
    $noEntries.style.display = 'block';
  } else {
    $noEntries.style.display = 'none';
  }
}
function viewSwap(view) {
  const $entriesView = document.querySelector('[data-view="entries"]');
  const $entryFormView = document.querySelector('[data-view="entry-form"]');
  if (!$entriesView || !$entryFormView)
    throw new Error('View elements not found!');
  if (view === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryFormView.classList.add('hidden');
  } else if (view === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  }
  data.view = view;
}
const $entriesLink = document.getElementById('entries-link');
if (!$entriesLink) throw new Error('$entriesLink query failed!');
$entriesLink.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('entries');
});
const $newEntryButton = document.getElementById('new-entry-button');
if (!$newEntryButton) throw new Error('$newEntryButton query failed!');
$newEntryButton.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('entry-form');
});
