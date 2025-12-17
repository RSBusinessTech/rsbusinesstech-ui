import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../property-management-system/model/property';
import { PropertyService } from '../property-management-system/services/property.service';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  // Current selected property.
  property: Property | null = null;

  // All properties of same type.
  allProperties: Property[] = [];

  // Similar properties (excluding the selected one).
  similar: Property[] = [];

  type: string = '';
  id: number = 0;

  // Image gallery (fallback images if property has no images).
  images: string[] = [
    'assets/images/buy-hero.webp',
    'assets/images/commercial-hero.webp',
    'assets/images/kl.webp',
    'assets/images/kl-rent-bg.webp',
    'assets/images/commercial-hero.webp',
    'assets/images/buy-hero.webp',
    'assets/images/kl-rent-bg.webp',
  ];

  selectedImage: string = this.images[0];

  showAll = false;
  showAllCommonFacilities = false;

  amenities: string[] = [];
  commonFacilities: string[] = [];
  mapUrl = '';
  videoURL = '';

  showEnquiry = false;

  currentIndex = 0;
  touchStartX = 0;
  touchEndX = 0;
  showLightbox = false;

  openLightbox() {
  this.showLightbox = true;
}

closeLightbox() {
  this.showLightbox = false;
}

  nextImage() {
  if (!this.images.length) return;
  this.currentIndex = (this.currentIndex + 1) % this.images.length;
  this.selectedImage = this.images[this.currentIndex];
}

prevImage() {
  if (!this.images.length) return;
  this.currentIndex =
    (this.currentIndex - 1 + this.images.length) % this.images.length;
  this.selectedImage = this.images[this.currentIndex];
}

/* Touch support for mobile */
onTouchStart(event: TouchEvent) {
  this.touchStartX = event.changedTouches[0].screenX;
}

onTouchEnd(event: TouchEvent) {
  this.touchEndX = event.changedTouches[0].screenX;
  this.handleSwipe();
}

handleSwipe() {
  const swipeDistance = this.touchEndX - this.touchStartX;

  if (swipeDistance > 50) {
    this.prevImage(); // swipe right
  } else if (swipeDistance < -50) {
    this.nextImage(); // swipe left
  }
}

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    //Extract type & id from route.
    this.type = params.get('type') || 'rent';
    this.id = Number(params.get('id')) || 0;

    //Try to load from cache first.
    const cachedList = this.propertyService.getCachedProperties(this.type);

    if (cachedList) {
      this.preparePropertyData(cachedList);
    } else {
      //Fallback: fetch from backend only when required (refresh or direct link).
      this.propertyService.getPropertiesByType(this.type).subscribe({
        next: (data) => this.preparePropertyData(data),
        error: (err) => console.error('Error fetching properties:', err)
      });
    }

  });
}

// Prepare selected property + similar properties
preparePropertyData(list: Property[]) {
  this.allProperties = list;

  // Find selected property
  this.property = list.find(p => p.id === this.id) || null;

  if (!this.property) return;

  // Set amenities, map URL, etc.
  this.amenities = this.property.amenities || [];
  this.commonFacilities = this.property.commonFacilities || [];
  this.mapUrl = this.property.location || '';

  this.videoURL = this.property.videoURL || '';

  // Prepare similar properties (exclude current one)
  this.similar = list.filter(p => p.id !== this.property!.id);

  // Always set the image gallery (with fallback)
  this.images = (this.property.imageUrls && this.property.imageUrls.length > 0)
    ? this.property.imageUrls
    : ['assets/images/buy-hero.webp'];

  this.currentIndex = 0;  
  this.selectedImage = this.images[0];
}

  selectImage(img: string) {
    this.selectedImage = img;
    this.currentIndex = this.images.indexOf(img);
  }

  toggleEnquiry() {
    this.showEnquiry = !this.showEnquiry;
  }

  openWhatsApp() {
    window.open('https://wa.me/+60162907662', '_blank');
  }

  // Amenities (show 4 by default).
  get displayedAmenities(): string[] {
    return this.showAll ? this.amenities : this.amenities.slice(0, 6);
  }

  toggleAmenities() {
    this.showAll = !this.showAll;
  }

  // Common facilities.
  get displayedCommonFacilities(): string[] {
    return this.showAllCommonFacilities ? this.commonFacilities : this.commonFacilities.slice(0, 6);
  }

  toggleCommonFacilities() {
    this.showAllCommonFacilities = !this.showAllCommonFacilities;
  }

  // Back button.
  goBack(): void {
    this.location.back();
  }

 // Universal Share button.
shareProperty(event: Event) {
  event.preventDefault();

  const title = (this.property && this.property.name)
    ? this.property.name
    : 'Property Listing';

  const shareData = {
    title: title,
    text: 'Check out this amazing property!',
    url: window.location.href
  };

  if ((navigator as any).share) {
    (navigator as any).share(shareData).catch((error: any) => {
      console.error('Share failed:', error);
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Sharing not supported on this browser. Link copied!');
  }
 }
}

