# Pet Edition · Digital Surprise Demo

A private, GitHub Pages-ready reusable showcase for pet shops, groomers, vets and pet-memorial partners.

## V2.5 update: guided writing assistant

The personalisation form now includes a private, browser-only writing assistant. Customers can enter an occasion, one memory and a preferred tone, then receive three editable message ideas in English, Simplified Chinese or Bahasa Melayu. Clicking an idea places it into the handwritten-ending field.

This release does not send customer stories to a third party. It is a guided-writing feature, not a live generative-AI connection. A future V3 can connect to a secure server-side AI endpoint after real customer demand is validated.

## What a pet partner sees

1. Premium bilingual introduction in Chinese and English
2. Three selectable experiences: Welcome Home, Pet Birthday and In Loving Memory
3. Full-screen Surprise Website V2 previews
4. Simple florist-controlled order handoff
5. Printable and digital QR flower-card concept
6. Explanation of the physical flower + digital surprise combination
7. Temporary DIY personalisation for names, language, ending message and voice recording

This is a florist preview hub, not a self-service customer creator.

## DIY preview mode

When Celeste clicks Love, Birthday or Date, a temporary personalisation panel opens first. She can:

- Enter the recipient's name
- Enter the sender's name
- Choose English, Bahasa Melayu or Chinese for the experience
- Write an optional custom handwritten ending
- Grant microphone permission and record up to 60 seconds
- Listen to the recording before opening the preview

The names and message are kept in the current browser session. The voice recording is stored locally in browser storage so the V2 experience can play it on the next page. Nothing is uploaded to Ming AI Automations or a third-party server.

This self-personalisation is intentionally for the demo only. Real paid orders can still be prepared and quality-checked by Ming AI Automations after Celeste forwards the customer's materials.

## Repository structure

```text
index.html          Florist-facing demo hub
style.css           Demo hub design
script.js           Demo hub interactions
demo-config.js      Demo hub names, links and bilingual wording

experience/         Complete Surprise Website V2 experience
```

## Files you may edit

### `demo-config.js`

Controls:

- Ming AI Automations branding
- Partner name
- Default showcase language
- Celeste Instagram link
- Chinese and English showcase wording

### `experience/client-config.js`

Controls the sample recipient experience:

- Recipient and sender names
- Passcode
- Default language and journey
- QR destination
- Photos, music and voice messages
- Memories and dates
- Handwritten endings
- Date-ticket details

No client names need to be edited inside HTML, CSS or the main scripts.

## Preview behavior

The three buttons on the showcase open:

```text
experience/index.html?preview=1&journey=love
experience/index.html?preview=1&journey=birthday
experience/index.html?preview=1&journey=date
```

Preview mode skips the passcode and sends Celeste directly into the selected journey. Opening `experience/index.html` normally retains the four-digit passcode flow.

## Optional demo assets

Place these files inside the `experience` folder:

- `photo-1.jpg` through `photo-6.jpg`
- `music.mp3`
- `voice-love.mp3`
- `voice-birthday.mp3`
- `voice-date.mp3`

Without photographs, the built-in premium colour artwork remains visible. Missing audio shows a clear notice instead of breaking the page.

## Publish on GitHub Pages

1. Create a new repository, suggested name: `Celeste-Surprise-Demo`.
2. Upload all files and the complete `experience` folder.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Choose `main` and `/ (root)`.
6. Save and wait for the site to publish.
7. Confirm the URL is:
   `https://the-ming-ai-automation.github.io/Celeste-Surprise-Demo/`
8. If you choose a different repository name, update `websiteUrl` inside `experience/client-config.js`.

## Final QA checklist

- Open the home page on mobile and desktop.
- Switch between 中文 and EN.
- Preview Love from beginning to handwritten ending.
- Confirm entered sender and recipient names appear throughout the experience.
- Record a short voice message, listen to it in the form, and play it again on the finale screen.
- Test the Delete button and microphone-denied fallback.
- Preview Birthday and test microphone permission plus manual fallback.
- Preview Date through the cinema sequence and ticket.
- Use the “back to preview menu” button after every journey.
- Test the normal four-digit passcode at `experience/index.html`.
- Test EN, BM and 中文 inside the recipient experience.
- Upload and play every audio file.
- Open `experience/qr.html` and scan the final QR with another phone.
- Confirm Celeste's Instagram button opens the correct profile.

## Positioning

The product is presented as a premium add-on to Celeste's existing flowers and handwritten cards. Celeste retains customer communication and payment; Ming AI Automations handles production and QR delivery.
