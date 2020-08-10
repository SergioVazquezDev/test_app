import { TestBed, async, inject } from '@angular/core/testing';
import { PicsumService } from './picsum.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoData } from '../model/photoData.model';

describe('PicsumService', () => {
  let picsumService: PicsumService;
  let httpMock: HttpTestingController;
  let dataResponse: PhotoData[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PicsumService],
    });
    picsumService = TestBed.inject(PicsumService);
    httpMock = TestBed.get(HttpTestingController);

    dataResponse = [
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

  it('should be created', () => {
    expect(picsumService).toBeTruthy();
  });

  it(`should fetch data as an Observable`, async(
    inject(
      [HttpTestingController, PicsumService],
      () => {
        picsumService.getAllPhotosDataFromJson().subscribe((response: any) => {
          expect(response.length).toBe(3);
        });

        const request = httpMock.expectOne('/assets/data/picsum.json');
        expect(request.request.method).toBe('GET');

        request.flush(dataResponse);
        httpMock.verify();
      }
    )
  ));
});
