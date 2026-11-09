import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BIO_PROFILE,
  WHAT_I_DO,
  WHY_WORK_WITH_ME,
  ABOUT_ME_PARAGRAPHS,
  FEATURED_PRODUCT,
  FREE_GUIDES,
  FREE_APPS,
  CHANNELS,
  EXPLORE_ITEMS
} from './bio-data';

test('bio profile contains correct name and essential information', () => {
  assert.equal(BIO_PROFILE.name, 'Nirmal');
  assert.equal(BIO_PROFILE.title, 'Creator, Designer & Builder');
  assert.ok(BIO_PROFILE.greeting.includes('Nirmal'));
  assert.equal(BIO_PROFILE.tagline, 'I make ideas real.');
  assert.ok(BIO_PROFILE.email.includes('@'));
  assert.ok(BIO_PROFILE.avatarUrl.includes('nirmal_portrait'));
});

test('what I do pillars contain Brand, Build, Automate, Grow', () => {
  assert.equal(WHAT_I_DO.length, 4);
  const pillars = WHAT_I_DO.map(w => w.pillar);
  assert.deepEqual(pillars, ['Brand.', 'Build.', 'Automate.', 'Grow.']);
});

test('free guides contain the requested guides with steps', () => {
  assert.ok(FREE_GUIDES.length >= 5);
  const guideTitles = FREE_GUIDES.map(g => g.title);
  assert.ok(guideTitles.includes('Build your first Windows utility with AI'));
  assert.ok(guideTitles.includes('ComfyUI fixes'));
  assert.ok(guideTitles.includes('Free AI video tools'));
  assert.ok(guideTitles.includes('Open-source alternatives'));
  assert.ok(guideTitles.includes('iPhone shortcuts'));

  for (const guide of FREE_GUIDES) {
    assert.ok(guide.keySteps.length > 0, `Guide ${guide.title} must have keySteps`);
    assert.ok(guide.description.length > 10);
    assert.ok(guide.coverImage && guide.coverImage.length > 0, `Guide ${guide.title} must have coverImage`);
  }
});

test('featured product has ₹0 store information', () => {
  assert.equal(FEATURED_PRODUCT.title, 'Build your own online store for ₹0');
  assert.ok(FEATURED_PRODUCT.highlights.length >= 3);
});

test('channels list contains Instagram, YouTube, LinkedIn, GitHub', () => {
  const channelNames = CHANNELS.map(c => c.name);
  assert.ok(channelNames.includes('Instagram'));
  assert.ok(channelNames.includes('YouTube'));
  assert.ok(channelNames.includes('LinkedIn'));
  assert.ok(channelNames.includes('GitHub'));
});

test('explore items contain work, about, and playground', () => {
  const ids = EXPLORE_ITEMS.map(e => e.id);
  assert.deepEqual(ids, ['work', 'about', 'playground']);
});

test('free apps contain pc-console, little-notes, third-space, and orbit with valid github links and download links', () => {
  assert.equal(FREE_APPS.length, 4);
  const appIds = FREE_APPS.map(a => a.id);
  assert.deepEqual(appIds, ['pc-console', 'little-notes', 'third-space', 'orbit']);

  for (const app of FREE_APPS) {
    assert.ok(app.githubUrl.startsWith('https://github.com/rizo8107/'), `App ${app.title} must have rizo8107 repo link`);
    assert.ok(
      app.downloadUrl?.startsWith('https://pub-95b34bd26a304d5c8afd01e3756e6d72.r2.dev/') ||
      app.downloadUrl?.startsWith('https://github.com/rizo8107/'),
      `App ${app.title} must have direct download link`
    );
    assert.ok(app.downloadFileName?.length, `App ${app.title} must have downloadFileName`);
    assert.ok(app.coverImage.startsWith('/assets/images/'));
    assert.ok(app.features.length >= 3);
  }
});

