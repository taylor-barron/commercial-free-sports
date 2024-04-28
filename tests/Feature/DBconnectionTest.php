<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class DBconnectionTest extends TestCase
{
    /**
     * Test database connection.
     *
     * @return void
     */
    public function testDatabaseConnection()
    {
        try {

            DB::connection()->getPdo();
            $this->assertTrue(true);

        } catch (\Exception $e) {
            $this->fail('Could not connect to the database. Please check your configuration. error: ' . $e );
        }
    }
}
