import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services';
import { Router } from '@angular/router';
import { Event } from '../_models';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: any = [];
  event: any = {};
  id: any = {};

  constructor(private formBuilder: FormBuilder, private eventService: EventService) { }

  editEventForm = this.formBuilder.group({
    title: [''],
    description: [''],
    location: [''],
    startDate: [''],
    endDate: [''],
  });

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    return this.eventService.getEvents().subscribe((data: {}) => {
      this.events = data;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {
    this.displayStyle = "block";
    this.eventService.getEvent(id).subscribe((data: {}) => {
      this.event = data;
      this.id = id;
      console.log(data)

      this.editEventForm.patchValue({
        title: this.event.title,
        description: this.event.description,
        location: this.event.location,
        startDate: this.event.startDate,
        endDate: this.event.endDate,
      });

    })
  }

  closePopup() {
    this.displayStyle = "none";
  }

  updateEvent() {
     //console.warn(this.editEventForm.value);
     //console.log(this.id)
    this.eventService.updateEvent(this.id, this.editEventForm.value).subscribe((data: {}) => {
        this.loadEvents();
        this.closePopup();
      });
  }

  deleteEvent(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.eventService.deleteEvent(id).subscribe((data: {}) => {
        this.loadEvents();
      });
    }
  }

}
