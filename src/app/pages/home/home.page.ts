import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PicsumService } from '../../services/picsum.service';
import { PhotoData } from '../../model/photoData.model';
import { Subscription } from 'rxjs';
import { IonSearchbar, IonContent, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  pageTitle = 'Home';

  allPicsumDataFromJson: PhotoData[] = [];
  allPicsumDataFromJsonSubcription: Subscription = new Subscription();

  photosDataShow: PhotoData[] = [];
  skeletonArray = [...Array(10).keys()];
  ITEM_PER_PAGE = 20;

  allFilteredPicsumDataShow: PhotoData[] = [];
  searchText = '';

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  constructor(private picsumService: PicsumService) {}

  ngOnInit() {
    this.getAllPhotosDataFromJson();
  }

  ionViewDidLeave() {
    this.resetSearchBar();
  }

  getAllPhotosDataFromJson() {
    this.allPicsumDataFromJsonSubcription = this.picsumService.getAllPhotosDataFromJson()
      .subscribe((response) => {
        this.allPicsumDataFromJson = response;
        this.addNewPagePhotoDataShow();
      });
  }

  addNewPagePhotoDataShow(event?) {
    this.photosDataShow.push(...this.getNewPagePhotosDataPagination());

    if (event) {
      this.infiniteScrollControl(event);
    }
  }

  getNewPagePhotosDataPagination() {
    return [...this.allPicsumDataFromJson].slice(
      this.photosDataShow.length,
      this.photosDataShow.length + this.ITEM_PER_PAGE
    );
  }

  loadScrollData(event) {
    if (!this.searchText.length) {
      this.addNewPagePhotoDataShow(event);
    } else {
      this.addNewPageFilteredPicsumData(event);
    }
  }

  infiniteScrollControl(event) {
    let totalItems: number;

    if (this.searchText.length) {
      totalItems = this.allFilteredPicsumDataShow.length;
    } else {
      totalItems = this.allPicsumDataFromJson.length;
    }

    if (this.photosDataShow.length === totalItems) {
      event.target.disabled = true;
      event.target.complete();
      return;
    }
    event.target.complete();
  }

  searchElement(filterText) {
    this.searchText = filterText.toLowerCase();
    if (!this.searchText) {
      this.photosDataShow = [];
      this.addNewPagePhotoDataShow();
      this.scrollToTop();
      this.infiniteScroll.disabled = false;
      return;
    }

    this.getFilteredPicsumData();
    this.photosDataShow = [];
    this.addNewPageFilteredPicsumData();
    this.scrollToTop();
  }

  getFilteredPicsumData() {
    this.allFilteredPicsumDataShow = [...this.allPicsumDataFromJson].filter(
      element => element.id.toString().includes(this.searchText) || element.text.includes(this.searchText));
  }

  addNewPageFilteredPicsumData(event?) {
    this.photosDataShow.push(...this.getNewPageWithFilterPhotosDataPagination());

    if (event) {
      this.infiniteScrollControl(event);
    }
  }

  getNewPageWithFilterPhotosDataPagination() {
    return [...this.allFilteredPicsumDataShow].slice(
      this.photosDataShow.length,
      this.photosDataShow.length + this.ITEM_PER_PAGE
    );
  }

  resetSearchBar() {
    this.searchText = '';
    this.searchbar.value = '';
    this.infiniteScroll.disabled = false;
  }

  scrollToTop() {
    this.content.scrollToTop(1500);
  }

  ngOnDestroy() {
    this.allPicsumDataFromJsonSubcription.unsubscribe();
  }
}
