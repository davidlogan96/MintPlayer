import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ArtistService } from '../../../services/artist/artist.service';
import { Artist } from '../../../entities/artist';
import { PaginationResponse } from '../../../helpers/pagination-response';
import { DatatableSettings } from '../../../controls/datatable/datatable-settings';
import { HtmlLinkHelper } from '../../../helpers/html-link.helper';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(
    @Inject('ARTISTS') private artistsInj: PaginationResponse<Artist>,
    private artistService: ArtistService,
    private router: Router,
    private urlSerializer: UrlSerializer,
    private titleService: Title,
    private htmlLink: HtmlLinkHelper,
    private metaService: Meta
  ) {
    this.titleService.setTitle('Artists');
    if (artistsInj === null) {
      this.loadArtists();
    } else {
      this.setArtistData(artistsInj);
    }
  }

  ngOnInit() {
    this.htmlLink.setCanonicalWithoutQuery();
    this.addMetaTags();
  }

  ngOnDestroy() {
    this.htmlLink.unset('canonical');
    this.removeMetaTags();
  }

  //#region Add meta-tags
  private basicMetaTags: HTMLMetaElement[] = [];
  private ogMetaTags: HTMLMetaElement[] = [];
  private twitterMetaTags: HTMLMetaElement[] = [];
  private addMetaTags() {
    this.addBasicMetaTags();
    this.addOpenGraphTags();
    this.addTwitterCard();
  }
  private addBasicMetaTags() {
    this.basicMetaTags = this.metaService.addTags([{
      name: 'description',
      content: 'Here you can find a list of all the artists in our database.'
    }]);
  }
  private addOpenGraphTags() {

  }
  private addTwitterCard() {

  }
  private removeMetaTags() {
    if (this.ogMetaTags !== null) {
      this.ogMetaTags.forEach((tag) => {
        this.metaService.removeTagElement(tag);
      });
    }
    if (this.basicMetaTags !== null) {
      this.basicMetaTags.forEach((tag) => {
        this.metaService.removeTagElement(tag);
      });
    }
    if (this.twitterMetaTags !== null) {
      this.twitterMetaTags.forEach((tag) => {
        this.metaService.removeTagElement(tag);
      });
    }
  }
  //#endregion

  loadArtists() {
    this.artistService.pageArtists(this.tableSettings.toPaginationRequest()).then((response) => {
      this.setArtistData(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  private setArtistData(data: PaginationResponse<Artist>) {
    this.artistData = data;
    this.tableSettings.pages.values = Array.from(Array(data.totalPages).keys()).map((p) => p + 1);
  }

  artistData: PaginationResponse<Artist> = new PaginationResponse();

  tableSettings: DatatableSettings = new DatatableSettings({
    columns: [{
      name: 'Name',
      data: 'name',
      title: 'Name',
      sortable: true
    }, {
      name: 'YearStarted',
      data: 'yearStarted',
      title: 'Year started',
      sortable: true
    }, {
      name: 'YearQuit',
      data: 'yearQuit',
      title: 'Year quit',
      sortable: true
    }],
    perPages: {
      values: [10, 20, 50, 100],
      selected: 20
    },
    pages: {
      values: [],
      selected: 1
    },
    sortProperty: 'Name',
    sortDirection: 'ascending'
  });

}

