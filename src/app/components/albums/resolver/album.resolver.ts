import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AlbumService } from "../service/albums.service";
import { Photo } from "../model/photo";

@Injectable()
export class AlbumResolver implements Resolve<Photo[]>{

    constructor(private albumsService: AlbumService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Photo[] | Observable<Photo[]> | Promise<Photo[]> {
        let photos: Photo[] = []
        return this.albumsService.findAlbumById(route.params['id']);
    }

}