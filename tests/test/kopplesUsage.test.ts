import keyboard from '../../src/components/keyboard.vue';
import { config, shallowMount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify();
config.global.stubs = {
  'v-slide-item': true,
};
describe('updateChannels', () => {
  it('Test czy kanały z właczonymi kopplami się dodają', () => {
    const page = shallowMount(keyboard, {
      global: { plugins: [vuetify] },
      props: {
        chanel: 1,
        keyboard: {
          range: [36, 96],
          transpozytor: 'sup',
        },
        playMethod: 'MiDi',
        koppledManuals: [
          { chanel: 2, tran: 'sup', range: [36, 55] },
          { chanel: 3, tran: 'sub', range: [36, 96] },
        ],
      },
    });
    const note = 60;
    const res = (page.vm as any).updateChannels(note);
    const testData = [1, 3];
    expect(res).toEqual(testData);
  });
});
describe('updateNotes', () => {
  it('Sprawdzenie czy nuty z klawiatur się dodają uwzględniając transpozycje', () => {
    const page = shallowMount(keyboard, {
      global: { plugins: [vuetify] },
      props: {
        chanel: 1,
        keyboard: { range: [36, 96], transpozytor: 'normal' },
        playMethod: 'MiDi',
        koppledManuals: [
          { chanel: 2, tran: 'sup', range: [36, 96] },
          { chanel: 3, tran: 'sub', range: [36, 96] },
          { chanel: 4, tran: 'sup', range: [36, 80] },
        ],
      },
    });
    const note = 60;
    const res = (page.vm as any).updateNotes(note);
    const testData = [note, note + 12, note - 12, note + 12];
    expect(res).toEqual(testData);
  });
});
describe('updateNotes2', () => {
  it('Sprawdzenie czy nuty z klawiatur się dodają uwzględniając transpozycje(jedno poza zakresem)', () => {
    const page = shallowMount(keyboard, {
      global: { plugins: [vuetify] },
      props: {
        chanel: 1,
        keyboard: { range: [36, 96], transpozytor: 'normal' },
        playMethod: 'MiDi',
        koppledManuals: [
          { chanel: 3, tran: 'sub', range: [36, 96] },
          { chanel: 4, tran: 'sup', range: [36, 40] },
        ],
      },
    });
    const note = 60;
    const res = (page.vm as any).updateNotes(note);
    const testData = [note, note - 12];
    expect(res).toEqual(testData);
  });
});
describe('updateNote', () => {
  it('Sprawdzenie czy metoda nakłądajaca transpozycję na nutę działa(sup)', () => {
    const page = shallowMount(keyboard, {
      global: { plugins: [vuetify] },
      props: { chanel: 1, keyboard: { range: [36, 96], transpozytor: 'sup' }, playMethod: 'MiDi' },
    });
    const note = 60;
    const res = (page.vm as any).updateNote(note);
    expect(res).toEqual([note + 12]);
  });
});
describe('updateNote2', () => {
  it('Sprawdzenie czy metoda nakłądajaca transpozycję na nutę działa(sub)', () => {
    const page = shallowMount(keyboard, {
      global: { plugins: [vuetify] },
      props: { chanel: 1, keyboard: { range: [36, 96], transpozytor: 'sub' }, playMethod: 'MiDi' },
    });
    const note = 60;
    const res = (page.vm as any).updateNote(note);
    expect(res).toEqual([note - 12]);
  });
});
describe('updateNote3', () => {
  it('Sprawdzenie czy metoda nakłądajaca transpozycję na nutę działa(normal)', () => {
    const page = shallowMount(keyboard, {
      global: { plugins: [vuetify] },
      props: {
        chanel: 1,
        keyboard: { range: [36, 96], transpozytor: 'normal' },
        playMethod: 'MiDi',
      },
    });
    const note = 60;
    const res = (page.vm as any).updateNote(note);
    expect(res).toEqual([note]);
  });
});
