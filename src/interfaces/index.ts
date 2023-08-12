export interface Developer {
    id: number;
    name: string;
    email: string;
}

export interface Infos {
    id: number;
    developerSince: Date;
    preferedOS: 'Windows' | 'Linux' | 'MacOS';
    developerId: number;
}

export interface Projects {
    id: number;
    name: string;
    description: string;
    repository: string;
    startDate: Date;
    endDate?: Date;
    developerId?: number;
}

export interface DevelopersData {
    developerId: number;
    developerName: string;
    developerEmail: string;
    developerInfoDeveloperSince: Date | null;
    developerInfoPreferedOS: string | null;
}

export interface ProjectData {
    projectId: number;
    projectName: string;
    projectDescription: string;
    projectRepository: string;
    projectStartDate: Date;
    projectEndDate: Date | null;
    projectDeveloperName: string | null;
}

export type developerCreate = Omit<Developer, 'id'>

export type infoCreate = Omit<Infos, 'id' | 'developerId'>

export type projectsCreate = Omit<Projects, 'id'>
