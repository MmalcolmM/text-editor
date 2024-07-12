const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();

  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;

  // Remove the hidden class from the install button
  butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show the install prompt
  promptEvent.prompt();

  // Wait for the user to respond to the prompt
  const result = await promptEvent.userChoice;
  console.log('User choice:', result);

  // Reset the deferred prompt variable, since it can only be used once
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.classList.toggle('hidden', true);
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed', event);

  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
