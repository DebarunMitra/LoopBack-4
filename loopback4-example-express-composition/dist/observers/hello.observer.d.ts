import { // The decorator
LifeCycleObserver } from '@loopback/core';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
export declare class HelloObserver implements LifeCycleObserver {
    events: string[];
    /**
     * This method will be invoked when the application starts
     */
    start(): Promise<void>;
    /**
     * This method will be invoked when the application stops
     */
    stop(): Promise<void>;
}
