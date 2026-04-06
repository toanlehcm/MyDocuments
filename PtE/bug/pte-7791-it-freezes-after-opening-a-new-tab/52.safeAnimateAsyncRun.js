'use strict'
// Workaround: Patch $$animateAsyncRun to prevent waitQueue deadlock.
// Root cause: In angular.js's $$AnimateAsyncRunFactoryProvider, the flush
// loop has no try...catch. If ONE callback throws, waitQueue = [] never
// runs → queue stuck forever → all subsequent animations deadlock.
//
// This decorator wraps each callback in try...catch so the loop always
// completes and waitQueue is always reset.
// NOTE: This does NOT modify angular.js source file.
angular.module('PtEMobile').config(['$provide', function($provide) {
    $provide.decorator('$$animateAsyncRun', ['$delegate', '$$rAF', function($delegate, $$rAF) {
        // Replacement: safe version of $$AnimateAsyncRunFactory
        var waitQueue = []
        console.log('decorator-animateAsyncRun');
        
        function waitForTick(fn) {
            waitQueue.push(fn)
            if (waitQueue.length > 1) return
            $$rAF(function() {
                // Snapshot and reset FIRST, then execute.
                // This guarantees waitQueue is always cleared even if a callback throws.
                var queue = waitQueue
                waitQueue = []
                for (var i = 0; i < queue.length; i++) {
                    try {
                        queue[i]()
                    } catch (e) {
                        // Swallow error from individual callback to protect the rest of the queue.
                        console.error('$$animateAsyncRun callback error:', e);
                    }
                }
            })
        }
        
        return function() {
            var passed = false
            waitForTick(function() {
                passed = true
            })
            return function(callback) {
                if (passed) {
                    callback()
                } else {
                    waitForTick(callback)
            }
        }
        }
    }])
}])