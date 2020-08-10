import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { PicsumService } from '../../services/picsum.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let picsumService: PicsumService;

  const mockPicsum = of([
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
    }
  ]);

  const scrollEvent = {
    type: 'ionInfinite', target: { disabled: false, complete: new Function()}
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule, HttpClientModule],
      providers: [PicsumService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    picsumService = fixture.debugElement.injector.get(PicsumService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load json at the init component', () => {
    spyOn(picsumService, 'getAllPhotosDataFromJson').and.returnValue(mockPicsum);

    component.ngOnInit();
    fixture.detectChanges();

    expect(picsumService.getAllPhotosDataFromJson).toHaveBeenCalled();
    expect(component.allPicsumDataFromJson.length).toBe(3);
  });

  it('should load the first 20 items on cards', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const app = fixture.nativeElement;
    const cardsItems = app.querySelectorAll('ion-card');
    expect(cardsItems.length).toEqual(20);
  });

  it('should show for each element the image and text on the card', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const app = fixture.nativeElement;
    const cardImg = app.querySelector('ion-img');
    const cardContent = app.querySelector('ion-card-content');

    expect(cardImg.getAttribute('ng-reflect-src')).toContain('picsum.photos/id/0');
    expect(cardContent.textContent).toEqual('# 0 - Minim proident qui aliqua ad do proident veniam officia incididunt sint irure.');
  });

  it('should load more element when scroll finish', () => {
    const spy = spyOn(component, 'loadScrollData').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();
    const infiniteScroll = fixture.debugElement.query(By.css('ion-infinite-scroll'));
    infiniteScroll.triggerEventHandler('ionInfinite', scrollEvent);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.photosDataShow.length).toBe(40);
  });

  it('should load only the elements matching the search criteria when the search bar has text to filter', () => {
    const spyGetFiltering = spyOn(component, 'getFilteredPicsumData').and.callThrough();
    const spyAddNewPageFiltering = spyOn(component, 'addNewPageFilteredPicsumData').and.callThrough();
    const spyScroll = spyOn(component, 'scrollToTop').and.callThrough();

    component.searchbar.value = '444';
    component.ngOnInit();
    fixture.detectChanges();

    const search = fixture.debugElement.query(By.css('ion-searchbar'));
    search.triggerEventHandler('ionChange', {detail: {value: '444'}, target: {value: new Function()}});
    fixture.detectChanges();

    expect(component.searchText).toBe('444');
    expect(spyGetFiltering).toHaveBeenCalled();
    expect(spyAddNewPageFiltering).toHaveBeenCalled();
    expect(spyScroll).toHaveBeenCalled();
    expect(component.photosDataShow.length).toBe(4);
  });

  it('should load more elements matching the search criteria when the search bar has text to filter and scroll finish', () => {
    const spyGetFiltering = spyOn(component, 'getFilteredPicsumData').and.callThrough();
    const spyAddNewPageFiltering = spyOn(component, 'addNewPageFilteredPicsumData').and.callThrough();
    const spyScroll = spyOn(component, 'scrollToTop').and.callThrough();

    component.searchbar.value = 'consectetur';
    component.ngOnInit();
    fixture.detectChanges();

    const search = fixture.debugElement.query(By.css('ion-searchbar'));
    search.triggerEventHandler('ionChange', {detail: {value: 'consectetur'}, target: {value: new Function()}});
    fixture.detectChanges();

    const infiniteScroll = fixture.debugElement.query(By.css('ion-infinite-scroll'));
    infiniteScroll.triggerEventHandler('ionInfinite', scrollEvent);
    fixture.detectChanges();

    expect(component.searchText).toBe('consectetur');
    expect(spyGetFiltering).toHaveBeenCalled();
    expect(spyAddNewPageFiltering).toHaveBeenCalled();
    expect(spyScroll).toHaveBeenCalled();
    expect(component.photosDataShow.length).toBe(40);
  });

  it('should disable infinite scroll when no exits more items and scroll finish', () => {
    component.searchbar.value = '444';
    component.ngOnInit();
    fixture.detectChanges();

    const search = fixture.debugElement.query(By.css('ion-searchbar'));
    search.triggerEventHandler('ionChange', {detail: {value: '444'}, target: {value: new Function()}});
    fixture.detectChanges();

    const infiniteScroll = fixture.debugElement.query(By.css('ion-infinite-scroll'));
    infiniteScroll.triggerEventHandler('ionInfinite', scrollEvent);
    fixture.detectChanges();

    expect(component.searchText).toBe('444');
    expect(component.photosDataShow.length).toBe(4);
    expect(component.photosDataShow.length).toBe(component.allFilteredPicsumDataShow.length)
  });

  it('should reset and load the first 20 items when clear text to filter', () => {
    const spyAddNewPage = spyOn(component, 'addNewPagePhotoDataShow').and.callThrough();
    const spyScroll = spyOn(component, 'scrollToTop').and.callThrough();

    component.searchbar.value = '';
    component.ngOnInit();
    fixture.detectChanges();

    const search = fixture.debugElement.query(By.css('ion-searchbar'));
    search.triggerEventHandler('ionChange', {detail: {value: ''}, target: {value: new Function()}});
    fixture.detectChanges();

    expect(component.searchText).toBe('');
    expect(spyAddNewPage).toHaveBeenCalled();
    expect(spyScroll).toHaveBeenCalled();
    expect(component.photosDataShow.length).toBe(20);
  });

  it('should reset searchBar when view did leave', () => {
    const spy = spyOn(component, 'resetSearchBar').and.callThrough();

    component.ionViewDidLeave();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.searchText).toEqual('');
    expect(component.searchbar.value).toEqual('');
  });

  it('should unsubscribe observable on destroy', () => {
    const spy = spyOn(component.allPicsumDataFromJsonSubcription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });
});
