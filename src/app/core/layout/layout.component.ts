import { MediaMatcher } from '@angular/cdk/layout';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/interfaces/menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})

export class LayoutComponent implements OnDestroy {

  menu: Menu[] = [];
  mobileQuery: MediaQueryList;
  shouldRun = true;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _menuService: MenuService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  loadMenu() {
    this._menuService.getMenu().subscribe(data => {
      //console.log(data);
      this.menu = data;
    })
  }

  ngOnInit(): void {
    this.loadMenu();
  }

}
