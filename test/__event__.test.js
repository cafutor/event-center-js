import EventCenter from '../lib/index.js';

const eventCenter = new EventCenter();

test('listen event and fire event', (done) => {
  eventCenter.on('event', (data) => {
    expect(data).toBe(1);
    done();
  });
  eventCenter.fire('event', 1);
  eventCenter.off('event');
});

test('it will only be called once', (done) => {
  expect.assertions(3);
  let j = 0;
  eventCenter.once('eventA', (data) => {
    expect(data).toBe(1);
    j++;
  });

  eventCenter.on('eventA', (data) => {
    j++;
    expect(data).toBe(1);
    if (j === 3) done();
  });

  eventCenter.fire('eventA', 1);
  eventCenter.fire('eventA', 1);
});

test('off event', (done) => {
  expect.assertions(1);
  eventCenter.on('eventB', (data) => {
    expect(data).toBe(1);
  });
  eventCenter.off('eventB');
  eventCenter.on('eventB', (data) => {
    expect(data).toBe(1);
  });
  eventCenter.fire('eventB', 1);
  done();
});

test('listener will be called by order', (done) => {
  let j = 0;
  const off1 = eventCenter.on('eventC', () => {
    j++;
    off1();
  });

  const off2 = eventCenter.on('eventC', () => {
    j++;
    off2();
  });

  const off3 = eventCenter.on('eventC', () => {
    j++;
    expect(j).toBe(3);
    off3();
    done();
  });

  eventCenter.fire('eventC');
});
