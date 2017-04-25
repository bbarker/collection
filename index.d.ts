import { Stream } from 'xstream'
import {Component} from "@cycle/isolate";

//TODO
export declare interface HasSubscribe<T> {
  subscribe: any
}
export declare interface Collection {

  /** Creates a collection.
   *
   * @param {item}
   *   The CycleJS component of which to create a collection.
   * @param {sources}
   *   Sources to be provided to all items$. Optional.
   * @param {add$}
   *   Stream of events to add items to the collection:
   *   each time an event is emitted, a new item is added
   *   to the collection. The emitted value is merged with
   *   {sources} and provided as input to {item}.
   *   Technically this parameter is optional, but seriously,
   *   you *do* want to add items to your collection don't you?
   * @param {remove$}
   *   To remove elements from the collection.
   *   To make use of this feature, {item} must provide, among
   *   its sinks, a stream emitting a value - no matter which -
   *   when the item in question should be removed. {remove$}
   *   is normally just a simple selector allowing you to
   *   indicate which is this stream.
   *   Note the difference of paradigm with {add$} :
   *   addition is defined when the collection is defined,
   *   but removal is defined when an item is defined.
   * @return
   *  A stream of arrays corresponding to the items.
   *  Use {pluck} to make use of it.
   */
  <SrcCommon, SrcAdded, Sink>(item: Component<SrcCommon & SrcAdded, Sink>,
    sources?: SrcCommon,
    add$?: Stream<SrcAdded>,
    remove$?: (itemSink: Sink) => Stream<any>):
    Stream<Array<Sink>>;
  
  /** Calls a defined callback function on every sink of a
   * stream issued from {Collection} and returns a stream of
   * arrays containing the results.
   */
  pluck<Sink, T>(
    sourceCollection$: HasSubscribe<Array<Sink>>,
    pluckSelector: (sink: Sink) => HasSubscribe<T>
  ): Stream<Array<T>>;


  // The following are tentative and can likely be improved:
  /**
   * Convert a stream of items' sources snapshots into a stream of collections.
   */
  gather<Src, Sink, Sub, T>
    (component: Component<Src, Sink>,
     sources: Src,
     sourceItems$: HasSubscribe<Sub>,
     idAttribute: string,
     transformKey: (string) => string
    ): Stream<Collection>


  merge<Sink, SinkMember, SinkMemberStream extends Stream<SinkMember> , T>(
    sourceCollection$: HasSubscribe<T>,
    mergeSelector: (Sink) => SinkMemberStream,
    internal?: boolean
  ): SinkMemberStream

}

export declare const Collection: Collection;
export default Collection
