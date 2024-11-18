const $form = document.querySelector('#entry-form') as HTMLFormElement;
const $urlPreview = document.querySelector(
  '#preview-image',
) as HTMLImageElement;
const $photoUrlInput = document.querySelector('#photo-url') as HTMLInputElement;

if (!$form) throw new Error('$form query failed!');
if (!$urlPreview) throw new Error('$urlPreview query failed!');
if (!$photoUrlInput) throw new Error('$photoUrlInput query failed!');

$photoUrlInput.addEventListener('input', function (event: Event) {
  const target = event.target as HTMLInputElement;
  $urlPreview.src = target.value || 'images/placeholder-image-square.jpg';
});

$form.addEventListener('submit', function (event: Event) {
  event.preventDefault();

  const newEntry = {
    entryId: data.nextEntryId,
    title: ($form.elements.namedItem('title') as HTMLInputElement).value,
    photoUrl: $photoUrlInput.value,
    content: ($form.elements.namedItem('content') as HTMLTextAreaElement).value,
  };

  data.nextEntryId++;
  data.entries.unshift(newEntry);

  writeData();

  $form.reset();
  $urlPreview.src = 'images/placeholder-image-square.jpg';
});
