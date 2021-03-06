import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SongService } from '../../../services/song/song.service';
import { Song } from '../../../entities/song';
import { PaginationResponse } from '../../../helpers/pagination-response';
import { DatatableSettings } from '../../../controls/datatable/datatable-settings';
import { HtmlLinkHelper } from '../../../helpers/html-link.helper';
import { SlugifyPipe } from '../../../pipes/slugify/slugify.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    @Inject('SERVERSIDE') private serverSide: boolean,
    @Inject('SONGS') private songsInj: PaginationResponse<Song>,
    private songService: SongService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private htmlLink: HtmlLinkHelper,
    private metaService: Meta
  ) {
    this.titleService.setTitle('All songs');
    if (serverSide) {
      this.setSongData(songsInj);
    } else {
      this.loadSongs();
    }
  }

  ngOnInit() {
    this.htmlLink.setCanonicalWithoutQuery();
    this.addMetaTags();
    //this.route.params.subscribe((routeParams) => {
    //	this.loadSongs();
    //});
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
      content: 'Here you can find a list of all the songs in our database.'
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

  loadSongs() {
    this.songService.pageSongs({ perPage: this.tableSettings.perPages.selected, page: this.tableSettings.pages.selected, sortProperty: this.tableSettings.sortProperty, sortDirection: this.tableSettings.sortDirection }).then((response) => {
      this.setSongData(response);
    }).catch((error) => {
      console.error('Could not fetch songs', error);
    });
  }

  private setSongData(data: PaginationResponse<Song>) {
    this.songData = data;
    this.tableSettings.pages.values = Array.from(Array(data.totalPages).keys()).map((p) => p + 1);
  }

  songData: PaginationResponse<Song> = new PaginationResponse();

  tableSettings: DatatableSettings = new DatatableSettings({
    columns: [{
      name: 'Title',
      data: 'title',
      title: 'Title',
      sortable: true
    }, {
      name: 'Released',
      data: 'released',
      title: 'Released',
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
    sortProperty: 'Title',
    sortDirection: 'ascending'
  });
}
