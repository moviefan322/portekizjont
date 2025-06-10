import { describe, it, expect } from 'vitest';
import { conjugate, detectGroup } from '../conjugate';

describe('detectGroup', () => {
  it('detects -ar verbs', () => {
    expect(detectGroup('falar')).toBe('ar');
  });

  it('detects -er verbs', () => {
    expect(detectGroup('comer')).toBe('er');
  });

  it('detects -ir verbs', () => {
    expect(detectGroup('partir')).toBe('ir');
  });

  it('returns null for unknown verb endings', () => {
    expect(detectGroup('fiz')).toBe(null);
  });
});

describe('conjugate - pretérito perfeito', () => {
  it('conjugates regular -ar verb', () => {
    expect(conjugate('falar', 'eu')).toBe('falei');
    expect(conjugate('falar', 'nós')).toBe('falamos');
  });

  it('conjugates regular -er verb', () => {
    expect(conjugate('comer', 'você')).toBe('comeu');
    expect(conjugate('comer', 'eles')).toBe('comeram');
  });

  it('conjugates regular -ir verb', () => {
    expect(conjugate('partir', 'você')).toBe('partiu');
    expect(conjugate('partir', 'nós')).toBe('partimos');
  });

  it('handles irregular verbs', () => {
    expect(conjugate('ser', 'eu')).toBe('fui');
    expect(conjugate('ter', 'nós')).toBe('tivemos');
  });

  it('returns null for unknown verb forms', () => {
    expect(conjugate('xyz', 'eu')).toBe(null);
    expect(conjugate('falar', 'tu')).toBe(null);
  });
});
