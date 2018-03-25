import { HourToStringPipe } from './hour-to-string.pipe';

describe('HourToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new HourToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
