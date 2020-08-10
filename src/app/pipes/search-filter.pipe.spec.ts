import { SearchFilterPipe } from './search-filter.pipe';

describe('SearchFilterPipe', () => {
  let data;
  beforeEach(() => {
    data = [
      {
        id: 0,
        photo: 'https://picsum.photos/id/0/500/500.jpg',
        text:
          'Minim proident qui aliqua ad do proident veniam officia incididunt sint irure.',
      },
      {
        id: 1,
        photo: 'https://picsum.photos/id/1/500/500.jpg',
        text:
          'Exercitation est consectetur exercitation aliquip officia aliquip adipisicing nisi non adipisicing incididunt ea minim.',
      },
      {
        id: 2,
        photo: 'https://picsum.photos/id/2/500/500.jpg',
        text: 'Sit sunt mollit pariatur laboris.',
      },
    ];
  });

  it('should create an instance', () => {
    const pipe = new SearchFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the element that meets the filtering condition', () => {
    const pipe = new SearchFilterPipe();
    const ret = pipe.transform(data, '1');

    expect(ret.length).toBe(1);
    expect(ret).toEqual([{
      id: 1,
      photo: 'https://picsum.photos/id/1/500/500.jpg',
      text:
        'Exercitation est consectetur exercitation aliquip officia aliquip adipisicing nisi non adipisicing incididunt ea minim.',
    }]);
  });

  it('should return all element when filter text is empty', () => {
    const pipe = new SearchFilterPipe();
    const ret = pipe.transform(data, '');

    expect(ret.length).toBe(3);
    expect(ret).toEqual(data);
  });
});
