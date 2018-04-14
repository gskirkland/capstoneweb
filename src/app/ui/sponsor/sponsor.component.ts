import { Component, OnInit } from '@angular/core';
import {SponsorService} from '../../services/sponsor.service';
import {Sponsor} from '../../models/sponsor/sponsor';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {

  sponsors: Sponsor[];

  constructor(private sponsorService: SponsorService) {}

  ngOnInit() {
      this.sponsorService.getSponsors()
          .then(sponsors => {
              this.sponsors = sponsors;

              this.sponsors.forEach(function(sponsor) {
                  sponsor.Description = sponsor.Description.replace(/(?:\\r\\n|\\r|\\n)/g, '<br>');
              });
          });
  }

  goToLink(link) {
      window.location.href = link;
  }

}
