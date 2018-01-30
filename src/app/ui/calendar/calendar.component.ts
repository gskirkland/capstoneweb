import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: [ ]
})

export class CalendarComponent implements OnInit {
    calendarCSV: any = "7:00AM - 10:30AM,,,,,,Registration,,,,,,,,,9:00AM - 10:30AM,,,,,,KEYNOTE & ANNOUNCEMENTS,,,,,,,,10:45AM - 11:55AM,Unlocking JavaScript via TypeScript - Josh Carroll,What\'s New in C#7 - Jason Bock,Stop Killing Requirements! - Melissa Green,Look into your Application with Visual Studio Application Insights - Joseph Guadagno,Being a Better Developer: Learning Skills That Aren\'t On Your Resume - Shawn Wildermuth,Performance Tuning Azure SQL Databases - John Sterrett,\"Tablets and Hybrids Need Mobile-Optimized Websites Too! - Andrew Malek\",Making developers lives easier with SQL Server 2016 - Samir Behara,Introduction to Entity Framework Core - Philip Japikse,Architecting the Future: Abstractions and Metadata - Daniel Barker,Crafting Innovation - Steve Green,Lightning,, 11:45AM - 1:00PM,,,,,,LUNCH,,,,,,,,12:55PM - 2:05PM,JavaScript is Not a Dirty Word - James Bender,Dockerize Your .NET Development - Lee Brandt,Introduction to Graph Databases with Neo4J - Brant Boehmann,How To Have Code Reviews Developers Actually Want - Cameron Presley,Slaying Epic Beasts: Planning and Executing Epics like an Agile Beowulf - Stjepan Rajko,Your QA Should Be Your BFF - Hilary Weaver-Robb,Details of Design: The Fine Art of Designing Web Experiences - Kristina Hardin,One Codebase to Rule Them All - Jason Cox,React vs Angular 2 - Doguhan Uluca,My Journey as a Microsoft Azure Program Manager - Matt Loflin,Giving Percentage Points? Crash-Course in Equity Vesting and Team Grants - Haseeb Q.,Lightning,,2:15PM - 3:25PM,Basics of Domain Driven Design: the Building Blocks of Successful Architecture - Joel Marshall,How to become a pro at Git - Chris Keathley,Public Speaking without Barfing on Your Shoes - David Neal,A DevOps Story - Jamie Phillips,\"Learning Node.js (Intermediate) -- Packages Modularity & Express - Haseeb Q\",\"Bits to Atoms an introduction to the Fourth Industrial Revolution - Sam McClanahan\",Coding with character. It\'s the study of logic! - Michael Luetjen,One Codebase to Rule Them All - Jason Cox,Women In Technology Panel,Nuclear Scrum : When Agile Practices meet Nuclear Physics - Stan Paulauskas,How to get to Minimum Viable Product - Ariana Shannon,Lightning,,3:35 PM - 4:45PM,A Developer\'s Journey from Object Oriented to Functional Programming - Reid Evans,Functional Programming Basics in ES6 (JavaScript) - Jeremy Fairbank,Geting started with Entity Framework Core - Jim Wooley,Developing ASP.NET Core in VS Code - Shawn Wildermuth,Swift 3: Third Time\'s the Charm - Douglas Starnes,Mind Blowing Internet of Things (IoT) Projects with Cognitive Services - Dan Thyer,Taking a byte of Java Bytecode - Magnus Stahre,Hour(s) of Code - Don\'t Let Your Kids Grow Up To Be Lawyers - Kevin Tuttle,Write Better JavaScript with TDD - James Bender,Release Management with Team Services - Paul Hacker,Onboarding: How to Set Clients up for Success - Tommy Nguyen,Lightning";
    
    model: any;
    constructor(){
        this.model = {array: this.calendarCSV.split(',')};
        console.log(this.model);
    }

    ngOnInit(){
        
    }
    
    ngAfterViewInit(){
        var tbody = jQuery("#calendar tbody");
        var newRow = '';
        console.log(this.model.array.length);
        newRow = '<tr>';

        for(var i = 0; i < this.model.array.length; i++){
            newRow += '<td>' + this.model.array[i] + '</td>';
            if(i % 14 == 0 && i != 0){
                newRow += '</tr><tr>';
                console.log(i);
            }
        } 
        jQuery(tbody).append(newRow);

    }
    
}