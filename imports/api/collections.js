import { Mongo } from 'meteor/mongo';
export const Service = new Mongo.Collection('service')
export const Events = new Mongo.Collection('events')
export const Packges = new Mongo.Collection('packges')
export const Providers = new Mongo.Collection('providers')

export const ClonedPackges = new Mongo.Collection('clonedPackges')

